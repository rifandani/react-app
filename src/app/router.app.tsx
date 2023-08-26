import { loginRoute, notFoundRoute } from '@auth/routes/auth.route';
import { createBrowserRouter } from 'react-router-dom';

// router singleton
export const router = createBrowserRouter([loginRoute, notFoundRoute], {
  future: {
    // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
    v7_normalizeFormMethod: true,
  },
});
