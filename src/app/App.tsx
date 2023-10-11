import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import AppErrorBoundary from './ErrorBoundary';
import AppProviders from './Providers';
import ReloadPromptSW from './ReloadPromptSW';
import { router } from './router.app';

export default function App() {
  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppProviders>
          <RouterProvider
            router={router}
            /**
             * Wrap all router state updates in `startTransition`
             * `startTransition` lets us update the state without blocking the UI
             *
             * @example
             *
             * if the user clicks a tab but then change their mind and click another tab, they can do that without waiting for the first re-render to finish.
             */
            future={{ v7_startTransition: true }}
          />

          <ReloadPromptSW />

          <ReactQueryDevtools initialIsOpen={false} />
        </AppProviders>
      </AppErrorBoundary>
    </StrictMode>
  );
}
