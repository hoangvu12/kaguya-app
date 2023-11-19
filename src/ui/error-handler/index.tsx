import axios from 'axios';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from 'react-native';
import { getDeviceId, getSystemVersion } from 'react-native-device-info';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

import { Env } from '@/core/env';

import { ErrorFallback } from './error-fallback';

const createMessageFromError = (error: Error) => {
  return `Message: ${error.message}\nStack: ${error.stack}`;
};

const splitMessages = (message: string, maxCharacters = 1024) => {
  const messages = [];

  while (message.length > maxCharacters) {
    messages.push(message.slice(0, maxCharacters));
    message = message.slice(maxCharacters);
  }

  messages.push(message);

  return messages;
};

const reportErrorToDiscord = async (errorMessage: string) => {
  if (!Env.REPORT_WEBHOOK) return;

  const messages = splitMessages(errorMessage);

  const deviceId = getDeviceId();
  const systemVersion = getSystemVersion();

  const deviceEmbed = {
    title: 'Device Info',
    description: `
Device ID: ${deviceId}
System Version: ${systemVersion}
App Version: ${Env.VERSION}
    `,
  };

  const embeds = messages.slice(0, 9).map((message, index) => ({
    title: `Error Report ${index + 1}`,
    description: message,
    color: 16711680, // Red color
  }));

  await axios.post(Env.REPORT_WEBHOOK, {
    embeds: [deviceEmbed, ...embeds],
  });
};

setJSExceptionHandler(async (error, isFatal) => {
  await reportErrorToDiscord(createMessageFromError(error));

  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${error.name} ${error.message}

        We will need to restart the app.
      `,
      [
        {
          text: 'Restart',
          onPress: () => {
            RNRestart.Restart();
          },
        },
      ]
    );
  } else {
    console.log(error);
  }
});

setNativeExceptionHandler((errorString) => {
  reportErrorToDiscord(errorString);
});

const myErrorHandler = (error: Error) => {
  reportErrorToDiscord(createMessageFromError(error));
};

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);
