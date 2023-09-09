import { loginRoute, notFoundRoute } from '@auth/routes/auth.route';
import { homeRoute } from '@home/routes/home.route';
import { playgroundRoute } from '@playground/routes/playground.route';
import { todosRoute } from '@todo/routes/todos.route';
import { createBrowserRouter } from 'react-router-dom';

// router singleton
export const router = createBrowserRouter(
  [homeRoute, todosRoute, playgroundRoute, loginRoute, notFoundRoute],
  {
    future: {
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  },
);
