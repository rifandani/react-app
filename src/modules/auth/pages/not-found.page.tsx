import { useUserStore } from '#auth/hooks/use-user-store.hook';
import { authPath } from '#auth/routes';
import { homePath } from '#home/routes';
import { modes } from '#shared/constants/theme.constant';
import { useColorMode } from '#shared/hooks/use-color-mode.hook';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { Link } from 'react-aria-components';

export function Element() {
  const userStore = useUserStore();
  const [t] = useI18n();
  useColorMode({
    modes,
    attribute: 'data-theme',
  });

  return (
    <div className="font-mono flex min-h-screen flex-col items-center justify-center opacity-80 bg-[radial-gradient(oklch(var(--p))_0.5px_,transparent_0.5px),radial-gradient(oklch(var(--p))_0.5px_,oklch(var(--b1))_0.5px)] bg-[0_0_,10px_10px] bg-[length:20px_20px]">
      <h1 className="text-8xl font-bold tracking-wider text-primary">404</h1>
      <h2 className="my-3 text-2xl font-semibold">{t('notFound')}</h2>
      <p className="text-md text-base-content">{t('gone')}</p>

      <Link
        href={userStore.user ? homePath.root : authPath.login}
        className="mt-10 btn btn-primary hover:skew-x-12"
      >
        {t('backTo', { target: userStore.user ? 'home' : 'login' })}
      </Link>
    </div>
  );
}