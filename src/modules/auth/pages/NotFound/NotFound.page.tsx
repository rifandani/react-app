import { Link } from 'react-router-dom';
import useNotFoundPageVM from './NotFound.vm';

export default function NotFoundPage() {
  const { userStore, t } = useNotFoundPageVM();

  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-3 text-primary-content">
      <h1 className="text-3xl font-bold italic">{t('notFound404')}</h1>
      <p className="mb-5">{t('gone')}</p>

      <Link
        to={userStore.user ? '/' : '/login'}
        className="link text-primary-content hover:skew-x-12"
      >
        {t('goBackTo', { target: userStore.user ? 'home' : 'login' })}
      </Link>
    </main>
  );
}
