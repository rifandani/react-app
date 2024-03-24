import reactjs from '#assets/images/reactjs.svg';
import { authApi, loginSchema } from '#auth/apis/auth.api';
import { LoginForm } from '#auth/components/login-form';
import { useUserStore } from '#auth/hooks/use-user-store.hook';
import { homePath } from '#home/routes';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { checkAuthUser } from '#shared/utils/checker.util';
import { Link } from 'react-aria-components';
import { unstable_batchedUpdates } from 'react-dom';
import type { ActionFunctionArgs, LoaderFunction } from 'react-router-dom';
import { json, redirect } from 'react-router-dom';
import { toast } from 'sonner';

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === 'POST') {
    const payload = Object.fromEntries(await request.formData());

    // if `payload` is not correct, return error object
    const parsed = loginSchema.safeParse(payload);
    if (!parsed.success) return json(parsed.error, { status: 400 });

    // will throw if `login` returns 500 error, therefore `errorElement` will be rendered
    const loginResponse = await authApi.login(parsed.data);

    if ('message' in loginResponse)
      // on 400 error
      return json(loginResponse);

    // see https://docs.pmnd.rs/zustand/recipes/recipes#calling-actions-outside-a-react-event-handler
    unstable_batchedUpdates(() => {
      useUserStore.getState().setUser(loginResponse); // set user data to store
    });

    return redirect(homePath.root);
  }

  toast.warning('Not Implemented');
  return new Response('Not Implemented', { status: 501 });
}

export const loader: LoaderFunction = () => {
  const authed = checkAuthUser();

  // redirect auth user to home
  if (authed) {
    toast.info('Already Logged In');
    return redirect(homePath.root);
  }

  return null;
};

export function Element() {
  const [t] = useI18n();

  return (
    <div className="min-h-screen w-full flex">
      {/* form */}
      <section className="min-h-screen w-full flex flex-col justify-center px-10 xl:px-20 md:w-1/2">
        <h1 className="text-center text-3xl text-primary">{t('welcome')}</h1>

        <LoginForm />

        <p className="py-12 text-center">
          {t('noAccount')}{' '}
          <Link
            aria-label={t('registerHere')}
            className="hover:underline"
            href="/does-not-exists"
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
