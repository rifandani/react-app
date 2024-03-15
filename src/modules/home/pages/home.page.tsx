import { authPath } from '#auth/routes';
import { HomeClock } from '#home/components/home-clock';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { checkAuthUser } from '#shared/utils/checker.util';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { redirect, type LoaderFunction } from 'react-router-dom';
import { toast } from 'react-toastify';

export const loader: LoaderFunction = () => {
  const authed = checkAuthUser();

  // redirect NOT authed user to login
  if (!authed) {
    toast.error('Unauthorized');
    return redirect(authPath.login);
  }

  return null;
};

export function Element() {
  const [t] = useI18n();
  const [parentRef] = useAutoAnimate();

  return (
    <div
      ref={parentRef}
      className="container mx-auto flex flex-col items-center py-24 duration-300"
    >
      <h1 className="text-3xl sm:text-4xl">{t('title')}</h1>

      <HomeClock />
    </div>
  );
}
