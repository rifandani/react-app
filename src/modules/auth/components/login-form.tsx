import type { LoginSchema } from '#auth/apis/auth.api';
import { loginSchema } from '#auth/apis/auth.api';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { ErrorApiResponseSchema } from '#shared/schemas/api.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'react-aria-components';
import { useForm } from 'react-hook-form';
import { useFetcher } from 'react-router-dom';

const defaultValues: LoginSchema = {
  username: '',
  password: '',
};

export function LoginForm() {
  const [t] = useI18n();
  const fetcher = useFetcher();
  const form = useForm<LoginSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  return (
    <fetcher.Form
      id="LoginForm"
      className="form-control pt-3 md:pt-8"
      method="POST"
    >
      {/* username */}
      <fieldset className="group/username form-control pt-4">
        <label className="label" htmlFor="username">
          <span className="label-text">{t('username')}</span>
        </label>

        <input
          id="username"
          type="text"
          aria-invalid={!!form.formState.errors.username?.message}
          className="peer input input-primary mt-1 shadow-md aria-[invalid='true']:input-error"
          placeholder={t('usernamePlaceholder')}
          {...form.register('username', { required: true, minLength: 3 })}
        />

        {form.formState.errors.username?.message && (
          <p
            role="alert"
            aria-label="input username error alert"
            className="flex pt-2 text-error"
          >
            {t('errorMinLength', { field: 'username', length: '3' })}
          </p>
        )}
      </fieldset>

      {/* password */}
      <fieldset className="group/password form-control pt-4">
        <label className="label" htmlFor="password">
          <span className="label-text">{t('password')}</span>
        </label>

        <input
          id="password"
          type="password"
          aria-invalid={!!form.formState.errors.password?.message}
          className="peer input input-primary mt-1 shadow-md aria-[invalid='true']:input-error"
          placeholder={t('passwordPlaceholder')}
          {...form.register('password', { required: true, minLength: 6 })}
        />

        {form.formState.errors.password?.message && (
          <p
            role="alert"
            aria-label="input password error alert"
            className="flex pt-2 text-error"
          >
            {t('errorMinLength', { field: 'password', length: '6' })}
          </p>
        )}
      </fieldset>

      {fetcher.data && (
        <div
          role="alert"
          aria-label="fetcher error alert"
          className="alert alert-error mt-3 shadow-lg"
        >
          <p className="text-error-content">
            ❌ {(fetcher.data as ErrorApiResponseSchema).message}
          </p>
        </div>
      )}

      <Button
        type="submit"
        className="btn btn-primary mt-8 capitalize disabled:btn-outline"
        isDisabled={fetcher.state === 'submitting' || !form.formState.isValid}
      >
        {t(fetcher.state === 'submitting' ? 'loginLoading' : 'login')} (0lelplR)
      </Button>
    </fetcher.Form>
  );
}
