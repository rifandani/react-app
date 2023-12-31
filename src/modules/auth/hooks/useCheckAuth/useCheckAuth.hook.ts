import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import { authPath } from '@auth/routes/auth.route';
import { homePath } from '@home/routes/home.route';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { useMount } from 'ahooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  const { user } = useUserStore();

  useMount(() => {
    if (!user && location.pathname.includes('login')) return;

    if (!user) {
      navigate(authPath.login, { replace: true });
      toast.error(t('unauthorized'));
      return;
    }

    if (location.pathname.includes('login')) {
      navigate(homePath.root);
      toast.info(t('authorized'));
    }
  });
}
