import { useAtomValue } from 'jotai/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import WebView from 'react-native-webview';
import { z } from 'zod';

import { View } from '@/ui';
import { createParseJSONSchema } from '@/utils/zod';

import { currentTimeAtom, isBufferingAtom, pausedAtom } from '../store';

const eventSchema = z.object({
  type: z.enum(['ready']),
});

const parseJSON = createParseJSONSchema(eventSchema);

const WEBVIEW_URL = 'https://ass-renderer.netlify.app';

interface MediaASSSubtitleProps {
  subContent: string;
}

const MediaASSSubtitle: React.FC<MediaASSSubtitleProps> = ({ subContent }) => {
  const webViewRef = useRef<WebView | null>(null);
  const [isWebViewReady, setIsWebViewReady] = useState(false);
  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
  const isPaused = useAtomValue(pausedAtom);
  const currentTime = useAtomValue(currentTimeAtom);
  const isBuffering = useAtomValue(isBufferingAtom);

  const postMessage = useCallback((data: any) => {
    webViewRef.current?.postMessage(JSON.stringify(data));
  }, []);

  const play = useCallback(() => {
    postMessage({
      type: 'play',
    });
  }, [postMessage]);

  const pause = useCallback(() => {
    postMessage({
      type: 'pause',
    });
  }, [postMessage]);

  const setTime = useCallback(() => {
    postMessage({
      type: 'setTime',
      value: currentTime,
    });
  }, [postMessage, currentTime]);

  const setSubContent = useCallback(
    (content: string) => {
      postMessage({
        type: 'setSubContent',
        value: content,
      });
    },
    [postMessage]
  );

  useEffect(() => {
    if (!isWebViewLoaded) return;

    setSubContent(subContent);
  }, [subContent, isWebViewLoaded, setSubContent]);

  useEffect(() => {
    if (!isWebViewReady) return;

    if (isPaused || isBuffering) {
      return pause();
    }

    play();
  }, [isBuffering, isPaused, isWebViewReady, pause, play]);

  useEffect(() => {
    if (!isWebViewReady) return;

    setTime();
  }, [isWebViewReady, setTime]);

  return (
    <View className="absolute z-10 h-full w-full" pointerEvents="none">
      <WebView
        ref={webViewRef}
        source={{
          uri: WEBVIEW_URL,
        }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        }}
        onLoad={() => {
          setIsWebViewLoaded(true);
        }}
        onMessage={(e) => {
          const parsedJson = parseJSON.safeParse(e.nativeEvent.data);

          if (!parsedJson.success) return;

          setIsWebViewReady(true);
        }}
      />
    </View>
  );
};

export default MediaASSSubtitle;
