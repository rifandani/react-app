import { loginRoute, notFoundRoute } from '#/auth/routes';
import { homeRoute } from '#/home/routes';
import { playgroundRoute } from '#/playground/routes';
import { todosRoute } from '#/todo/routes';
import { createBrowserRouter } from 'react-router-dom';

// router singleton
export const browserRouter = createBrowserRouter(
  [homeRoute, todosRoute, playgroundRoute, loginRoute, notFoundRoute],
  {
    future: {
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  },
);
