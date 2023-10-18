import { RouterProvider } from 'react-router-dom';
import { router } from './router';

export default function AppRouterProvider() {
  return (
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
  );
}
