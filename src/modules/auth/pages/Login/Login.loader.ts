import { homePath } from '@home/routes/home.route';
import { checkAuthUser } from '@shared/utils/checker.util';
import { LoaderFunction, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loginLoader: LoaderFunction = () => {
  const authed = checkAuthUser();

  // redirect auth user to home
  if (authed) {
    toast.info('Already Logged In');
    return redirect(homePath.root);
  }

  return null;
};
