import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { AppI18nProvider } from './providers/i18n/provider';
import { AppQueryProvider } from './providers/query/provider';
import { AppRouterProvider } from './providers/router/provider';
import { AppToastProvider } from './providers/toast/provider';
import { ReloadPromptSw } from './reload-prompt-sw';

export function Entry() {
  return (
    <StrictMode>
      <AppQueryProvider>
        <AppI18nProvider>
          <AppToastProvider>
            {/* router entry point */}
            <AppRouterProvider />

            {/* PWA */}
            <ReloadPromptSw />

            {/* react query devtools */}
            <ReactQueryDevtools
              buttonPosition="bottom-left"
              initialIsOpen={false}
            />
          </AppToastProvider>
        </AppI18nProvider>
      </AppQueryProvider>
    </StrictMode>
  );
}
