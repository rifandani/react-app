import type { LoginSchema } from '#auth/apis/auth.api';
import { loginSchema } from '#auth/apis/auth.api';
import { Button } from '#shared/components/ui/button';
import { Input } from '#shared/components/ui/input';
import { Label } from '#shared/components/ui/label';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { ErrorApiResponseSchema } from '#shared/schemas/api.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { FieldError, TextField } from 'react-aria-components';
import { Controller, useForm } from 'react-hook-form';
import { useFetcher } from 'react-router-dom';

const defaultValues: LoginSchema = {
  username: '',
  password: '',
};

export function LoginForm() {
  const [t] = useI18n();
  const fetcher = useFetcher();
  const { control, formState } = useForm<LoginSchema>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  return (
    <fetcher.Form className="flex flex-col pt-3 md:pt-8" method="POST">
      {/* username */}
      <Controller
        control={control}
        name="username"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            className="group/username pt-4"
            // Let React Hook Form handle validation instead of the browser.
            validationBehavior="aria"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
            isRequired
          >
            <Label>{t('username')}</Label>
            <Input placeholder={t('usernamePlaceholder')} ref={ref} />
            <FieldError className="text-destructive">
              {error?.message}
            </FieldError>
          </TextField>
        )}
      />

      {/* password */}
      <Controller
        control={control}
        name="password"
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            className="group/password pt-4"
            // Let React Hook Form handle validation instead of the browser.
            validationBehavior="aria"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={invalid}
            isRequired
          >
            <Label>{t('password')}</Label>
            <Input
              type="password"
              placeholder={t('passwordPlaceholder')}
              ref={ref}
            />
            <FieldError className="text-destructive">
              {error?.message}
            </FieldError>
          </TextField>
        )}
      />

      {fetcher.data && (
        <div
          role="alert"
          aria-label="Fetcher error alert"
          className="mt-2 bg-destructive text-destructive-foreground p-2 rounded-md flex items-center gap-x-2 shadow-md w-full"
        >
          <Icon icon="lucide:alert-circle" />
          <p>{(fetcher.data as ErrorApiResponseSchema).message}</p>
        </div>
      )}

      <Button
        type="submit"
        className="mt-8"
        isDisabled={fetcher.state === 'submitting' || !formState.isValid}
      >
        {t(fetcher.state === 'submitting' ? 'loginLoading' : 'login')} (0lelplR)
      </Button>
    </fetcher.Form>
  );
}
