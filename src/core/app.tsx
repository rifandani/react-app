import { StrictMode } from 'react';
import { Devtools } from './providers/devtools';
import { AppI18nProvider } from './providers/i18n/provider';
import { AppQueryProvider } from './providers/query/provider';
import { ReloadPromptSw } from './providers/reload-prompt-sw';
import { AppRouterProvider } from './providers/router/provider';
import { AppToastProvider } from './providers/toast/provider';

export function App() {
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
