import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import React, { useEffect } from 'react';
import type { WebViewMessageEvent } from 'react-native-webview';
import WebView from 'react-native-webview';

const createMessage = <T,>(event: string, data: T) => {
  return {
    event,
    data,
  };
};

const parseWebViewMessage = <T,>(event: WebViewMessageEvent) => {
  const { event: responseEvent, data: responseData } = JSON.parse(
    event.nativeEvent.data
  ) as { event: string; data: T };

  return { event: responseEvent, data: responseData };
};

const preInjectCode = `
window.createMessage = (event, data) => {
  return {
    event,
    data,
  };
};

window.sendBack = (data) => {
  window.ReactNativeWebView.postMessage(JSON.stringify(data));
}

window.sendInternalMessage = (event, data) => {
  sendBack(createMessage(event, data));
}

window.sendRequest = (request) => {
  return new Promise((resolve) => {
    sendInternalMessage("internal__request", request);
    
    const handleMessage = function(event) {
      const data = JSON.parse(event.data);
      
      if (data.event === 'internal__response') {
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
      const { event: responseEvent, data: responseData } =
        parseWebViewMessage<AxiosRequestConfig>(e);

      if (responseEvent === 'internal__request') {
        axios(responseData).then((response) => {
          webView?.postMessage(
            JSON.stringify(createMessage('internal__response', response.data))
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
        source={{ uri: 'https://vuighe2.com' }}
        containerStyle={{ position: 'absolute', width: 0, height: 0 }}
        injectedJavaScript={preInjectCode}
      />

      {children}
    </WebViewContext.Provider>
  );
};

export const useWebView = () => {
  const { webView, observer } = React.useContext(WebViewContext);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const sendMessage = React.useCallback(
    <T,>(event: string, jsCode: string, args: Record<string, any> = {}) => {
      if (!webView) throw new Error('No WebView found');
      if (!observer) throw new Error('No observer found');

      webView.injectJavaScript(`
        try {        
          window.sendResponse = function(response) {
            window.sendBack(window.createMessage("${event}", response));
          }

          ${jsCode}
  
          run(${JSON.stringify(args)});
        } catch(e) {
          alert(e)
        }

        true;
      `);

      return new Promise((resolve) => {
        observer.subscribe((e: WebViewMessageEvent) => {
          try {
            const { event: responseEvent, data: responseData } =
              parseWebViewMessage<T>(e);

            console.log(responseData);

            if (responseEvent !== event) return;

            resolve(responseData);
            observer.unsubscribe(resolve);
          } catch (err) {
            console.log(err);
          }
        });
      });
    },
    [observer, webView]
  );

  useEffect(() => {
    setIsLoaded(!!webView);
  }, [webView]);

  return { webview: webView, sendMessage, isLoaded };
};

export default WebViewProvider;
