import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as Sentry from 'sentry-expo';

import { ErrorFallback } from './error-fallback';

const myErrorHandler = (error: Error) => {
  Sentry.Native.captureException(error);
};

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
    {children}
  </ErrorBoundary>
);
