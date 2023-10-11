import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { Button } from 'react-aria-components';
import useLoginForm from './useLoginForm.hook';

export default function LoginForm() {
  const { t, fetcher, form } = useLoginForm();

  return (
    <fetcher.Form
      id="LoginForm"
      aria-label="form-login"
      className="form-control pt-3 md:pt-8"
      method="POST"
    >
      {/* username */}
      <fieldset className="group/username form-control pt-4">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="label" htmlFor="username">
          <span className="label-text">{t('username')}</span>
        </label>

        <input
          id="username"
          type="text"
          aria-label="textbox-username"
          aria-labelledby="#username"
          aria-invalid={!!form.formState.errors.username?.message}
          className="peer input input-primary mt-1 shadow-md aria-[invalid='true']:input-error"
          placeholder={t('usernamePlaceholder')}
          {...form.register('username', { required: true, minLength: 3 })}
        />

        {form.formState.errors.username?.message && (
          <p role="alert" className="flex pt-2 text-error">
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
          aria-label="textbox-password"
          aria-labelledby="#password"
          aria-invalid={!!form.formState.errors.password?.message}
          className="peer input input-primary mt-1 shadow-md aria-[invalid='true']:input-error"
          placeholder={t('passwordPlaceholder')}
          {...form.register('password', { required: true, minLength: 6 })}
        />

        {form.formState.errors.password?.message && (
          <p role="alert" className="flex pt-2 text-error">
            {t('errorMinLength', { field: 'password', length: '6' })}
          </p>
        )}
      </fieldset>

      {fetcher.data && (
        <div className="alert alert-error mt-3 shadow-lg">
          <p className="text-error-content">
            ❌ {(fetcher.data as ErrorApiResponseSchema).message}
          </p>
        </div>
      )}

      <Button
        type="submit"
        className="btn btn-primary mt-8 disabled:btn-outline"
        isDisabled={fetcher.state === 'submitting' || !form.formState.isValid}
      >
        {t(fetcher.state === 'submitting' ? 'loginLoading' : 'login')} (0lelplR)
      </Button>
    </fetcher.Form>
  );
}
