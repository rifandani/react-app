'use client';

import { PropsWithChildren } from 'react';
import { Button } from 'react-aria-components';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-3">Something went wrong.</h1>

      <Button type="button" onPress={resetErrorBoundary}>
        Reload Page
      </Button>

      <pre>{JSON.stringify(error, null, 2)}</pre>
    </main>
  );
}

export default function AppErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
      }}
      onError={() => {
        // Do something with the error, e.g. log to an external API
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
