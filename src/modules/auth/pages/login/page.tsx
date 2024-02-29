import reactjs from '#assets/images/reactjs.svg';
import { LoginForm } from '#auth/components/login-form';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { Link } from 'react-router-dom';

export function LoginPage() {
  const [t] = useI18n();

  return (
    <div id="LoginPage" className="min-h-screen w-full flex">
      {/* form */}
      <section className="min-h-screen w-full flex flex-col justify-center px-10 xl:px-20 md:w-1/2">
        <h1 className="text-center text-3xl text-primary">{t('welcome')}</h1>

        <LoginForm />

        <p className="py-12 text-center">
          {t('noAccount')}{' '}
          <Link
            aria-label={t('registerHere')}
            className="link link-primary"
            to="/register"
          >
            {t('registerHere')}
          </Link>
        </p>
      </section>

      {/* image */}
      <section className="hidden md:block w-1/2 shadow-2xl">
        <span className="relative h-screen w-full md:flex md:items-center md:justify-center">
          <img
            src={reactjs}
            alt="cool react logo with rainbow shadow"
            loading="lazy"
            className="h-full object-cover"
            aria-label="cool react logo"
          />
        </span>
      </section>
    </div>
  );
}
