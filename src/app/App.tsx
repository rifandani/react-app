import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import AppErrorBoundary from "./ErrorBoundary";
import ReloadPromptSW from "./ReloadPromptSW";
import AppI18nProvider from "./providers/i18n/I18nProvider";
import AppQueryProvider from "./providers/query/QueryProvider";
import AppRouterProvider from "./providers/router/RouterProvider";
import AppToastProvider from "./providers/toast/ToastProvider";

export default function App() {
  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppQueryProvider>
          <AppI18nProvider>
            <AppToastProvider>
              {/* router entry point */}
              <AppRouterProvider />

              {/* PWA */}
              <ReloadPromptSW />

              {/* react query devtools */}
              <ReactQueryDevtools
                buttonPosition="bottom-left"
                initialIsOpen={false}
              />
            </AppToastProvider>
          </AppI18nProvider>
        </AppQueryProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
}
