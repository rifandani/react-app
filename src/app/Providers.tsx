import { PropsWithChildren } from 'react';
import I18nProvider from './providers/i18n/I18nProvider';
import QueryProvider from './providers/query/QueryProvider';
import ToastProvider from './providers/toast/ToastProvider';

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <I18nProvider>
        <ToastProvider>{children}</ToastProvider>
      </I18nProvider>
    </QueryProvider>
  );
}
