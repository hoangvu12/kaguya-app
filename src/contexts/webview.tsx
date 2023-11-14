import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import type { WebViewMessageEvent } from 'react-native-webview';
import WebView from 'react-native-webview';

const createMessage = <T,>(event: string, data: T) => {
  return {
    event,
    data,
  };
};

const parseWebViewMessage = <T,>(event: WebViewMessageEvent) => {
  const message = JSON.parse(event.nativeEvent.data) as
    | { event: string; data: T }
    | { event: string; error: string };

  return message;
};

const preInjectCode = `
window.createMessage = (event, data) => {
  return {
    event,
    data,
  };
};

window.createError = (event, error) => {
  return {
    event,
    error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
  };
}

window.sendBack = (data) => {
  window.ReactNativeWebView.postMessage(JSON.stringify(data));
}

window.sendInternalMessage = (event, data) => {
  sendBack(createMessage(event, data));
}

window.sendRequest = (request) => {
  return new Promise((resolve) => {
    console.log(request);

    const key = Math.random().toString(36).substring(2, 9);

    sendInternalMessage("internal__request", { request, key });
    
    const handleMessage = function(event) {
      const data = JSON.parse(event.data);
      
      if (data.event === 'internal__response') {
        console.log(request, event.data);

        if (data.data.key !== key) return;

        window.removeEventListener('message', handleMessage);
        document.removeEventListener('message', handleMessage);
        
        resolve(data.data);
      }
    }

    document.addEventListener('message', handleMessage);
    window.addEventListener('message', handleMessage);
  })
}
`;

class Observer {
  private callbacks: Function[] = [];

  public subscribe(callback: Function) {
    this.callbacks.push(callback);
  }

  public unsubscribe(callback: Function) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  public notify(data: any) {
    this.callbacks.forEach((cb) => cb(data));
  }
}

const WebViewContext = React.createContext<{
  webView: WebView | null;
  observer: Observer | null;
}>({ webView: null, observer: null });

const WebViewProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [webView, setWebView] = React.useState<WebView | null>(null);
  const webViewRef = React.useRef<WebView>(null);
  const observer = React.useRef<Observer>(new Observer());

  useEffect(() => {
    if (!observer.current) return;
    if (!webView) return;

    const obs = observer.current;

    const handleMessage = async (e: WebViewMessageEvent) => {
      const message = parseWebViewMessage<{
        key: string;
        request: AxiosRequestConfig;
      }>(e);

      if ('error' in message) {
        return;
      }

      if (message.event === 'internal__request') {
        const { request, key } = message.data;

        axios(request).then((response) => {
          webView?.postMessage(
            JSON.stringify(
              createMessage('internal__response', {
                data: response.data,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                key,
              })
            )
          );
        });
      }
    };

    obs.subscribe(handleMessage);

    return () => {
      obs.unsubscribe(handleMessage);
    };
  }, [observer, webView]);

  return (
    <WebViewContext.Provider value={{ webView, observer: observer.current }}>
      <WebView
        webviewDebuggingEnabled
        ref={webViewRef}
        originWhitelist={['*']}
        onMessage={observer.current.notify.bind(observer.current)}
        onLoadEnd={() => {
          setWebView(webViewRef.current);
        }}
        source={{ html: '<html><body><h1>Hello world</h1></body></html>' }}
        containerStyle={{ position: 'absolute', width: 0, height: 0 }}
        injectedJavaScript={preInjectCode}
      />

      {children}
    </WebViewContext.Provider>
  );
};

export type UseWebViewData = ReturnType<typeof useWebView>;

export const useWebView = () => {
  const { webView, observer } = React.useContext(WebViewContext);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const lastLoadedScript = useRef('');

  const loadScript = React.useCallback(
    (jsCode: string) => {
      if (!webView) throw new Error('No WebView found');

      if (lastLoadedScript.current === jsCode) {
        return;
      }

      lastLoadedScript.current = jsCode;

      webView.injectJavaScript(`
        window.anime = {};
      `);

      webView.injectJavaScript(jsCode);
    },
    [webView]
  );

  const sendMessage = React.useCallback(
    <T,>(functionName: string, args: Record<string, any> = {}) => {
      if (!webView) throw new Error('No WebView found');
      if (!observer) throw new Error('No observer found');

      const event = `event_${Math.random().toString(36).substring(2, 9)}`;

      webView.injectJavaScript(`
        window.sendResponse = function(response) {
          window.sendBack(window.createMessage("${event}", response));
        }

        window.sendError = function(err) {
          window.sendBack(window.createError("${event}", err));
        }

        try {
          if (${functionName}.constructor.name !== 'AsyncFunction') {
            ${functionName}(${JSON.stringify(args)});
          } else {
            ${functionName}(${JSON.stringify(args)}).catch((e) => {
              console.error("Error in inject js async", e);

              window.sendError(e);
            })
          }

        } catch(e) {
          console.error("Error in inject js", e);

          window.sendError(e);
        }

        true;
      `);

      return new Promise<T>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Timeout'));
        }, 60000);

        const handleResponse = (e: WebViewMessageEvent) => {
          const message = parseWebViewMessage<T>(e);

          if (message.event !== event) return;

          if ('error' in message) {
            reject(new Error(message.error));
            return;
          }

          observer.unsubscribe(handleResponse);
          clearTimeout(timeout);

          resolve(message.data as T);
        };

        observer.subscribe(handleResponse);
      });
    },
    [observer, webView]
  );

  useEffect(() => {
    setIsLoaded(!!webView);
  }, [webView]);

  return { webview: webView, sendMessage, isLoaded, loadScript };
};

export default WebViewProvider;
