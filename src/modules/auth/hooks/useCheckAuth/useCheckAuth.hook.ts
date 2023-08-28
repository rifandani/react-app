import { loginRoute } from '@auth/routes/auth.route';
import { useUserStore } from '@auth/stores/useUser/useUser.hook';
import { homeRoute } from '@home/routes/home.route';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import useToaster from '@shared/hooks/useToaster/useToaster.hook';
import { useMount } from 'ahooks';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hooks to authenticate your user, wheter they're logged in or not
 *
 * @example
 *
 * ```tsx
 * useCheckAuth()
 * ```
 */
export default function useCheckAuth() {
  const [t] = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [, toaster] = useToaster();
  const { user } = useUserStore();

  useMount(() => {
    if (!user && location.pathname.includes('login')) return;

    if (!user) {
      navigate(loginRoute.path, { replace: true });
      toaster.add({
        type: 'error',
        title: t('unauthorized'),
      });
      return;
    }

    if (location.pathname.includes('login')) {
      navigate(homeRoute.path);
      toaster.add({
        type: 'info',
        title: t('authorized', {}),
      });
    }
  });
}
