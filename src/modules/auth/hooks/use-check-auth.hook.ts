import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMount } from '#shared/hooks/use-mount.hook';
import { useUserStore } from '#auth/hooks/use-user-store.hook';
import { authPath } from '#auth/routes';
import { homePath } from '#home/routes';
import { useI18n } from '#shared/hooks/use-i18n.hook';

/**
 * Hooks to authenticate your user, wheter they're logged in or not
 *
 * @example
 *
 * ```tsx
 * useCheckAuth()
 * ```
 */
export function useCheckAuth() {
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
