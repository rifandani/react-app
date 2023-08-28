import { loginRoute, notFoundRoute } from '@auth/routes/auth.route';
import { homeRoute } from '@home/routes/home.route';
import { createBrowserRouter } from 'react-router-dom';

// router singleton
export const router = createBrowserRouter(
  [homeRoute, loginRoute, notFoundRoute],
  {
    future: {
      // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
      v7_normalizeFormMethod: true,
    },
  },
);
