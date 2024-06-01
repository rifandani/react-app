import { StrictMode } from 'react';
import { Devtools } from './devtools';
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

            <Devtools />
          </AppToastProvider>
        </AppI18nProvider>
      </AppQueryProvider>
    </StrictMode>
  );
}
