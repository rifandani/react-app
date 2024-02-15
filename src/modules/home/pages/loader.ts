import type { LoaderFunction } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkAuthUser } from '#shared/utils/checker.util';
import { authPath } from '#auth/routes';

export const homeLoader: LoaderFunction = () => {
  const authed = checkAuthUser();

  // redirect NOT authed user to login
  if (!authed) {
    toast.error('Unauthorized');
    return redirect(authPath.login);
  }

  return null;
};
