import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from 'react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

import { reportErrorToDiscord } from '@/services/discord';

import { ErrorFallback } from './error-fallback';

const createMessageFromError = (error: Error) => {
  return `Message: ${error.message}\nStack: ${error.stack}`;
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
}, false);

const myErrorHandler = (error: Error) => {
  reportErrorToDiscord(createMessageFromError(error));
};

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);
