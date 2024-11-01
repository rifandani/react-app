import { useAuthUserStore } from '#/auth/hooks/use-auth-user-store.hook';
import { authPath } from '#/auth/routes';
import { Link } from '#/core/components/ui/link';
import { useColorMode } from '#/core/hooks/use-color-mode.hook';
import { useI18n } from '#/core/hooks/use-i18n/use-i18n.hook';
import { homePath } from '#/home/routes';

export function Element() {
  const userStore = useAuthUserStore();
  const [t] = useI18n();
  useColorMode({});

  return (
    <div className="font-mono flex min-h-screen flex-col items-center justify-center opacity-80 bg-[radial-gradient(hsl(var(--primary))_0.5px_,transparent_0.5px),radial-gradient(hsl(var(--primary))_0.5px_,hsl(var(--background))_0.5px)] bg-[0_0_,10px_10px] bg-[length:20px_20px]">
      <h1 className="text-8xl font-bold tracking-wider text-primary">404</h1>
      <h2 className="my-3 text-2xl font-semibold">{t('notFound')}</h2>
      <p className="text-md">{t('gone')}</p>

      <Link
        href={userStore.user ? homePath.root : authPath.login}
        className="mt-10 duration-300 transition hover:skew-x-12"
      >
        {t('backTo', { target: userStore.user ? 'home' : 'login' })}
      </Link>
    </div>
  );
}
