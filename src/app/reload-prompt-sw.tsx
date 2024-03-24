import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function ReloadPromptSw() {
  // replaced dynamically
  const buildDate = '__DATE__' as '__DATE__' | Omit<string, '__DATE__'>;
  const reloadSW = '__RELOAD_SW__' as '__RELOAD_SW__' | 'true';

  const onRegisteredSW = useCallback(
    (_swUrl: string, registration: ServiceWorkerRegistration | undefined) => {
      // in `vite.config.ts`, the `reloadSW` could be `'true'` if `process.env.RELOAD_SW === 'true'`
      if (reloadSW === 'true' && registration) {
        setInterval(() => {
          console.log('🔵 Updating Service Worker...');
          void registration.update();
        }, 10_000 /* 10s for testing purposes */);
      } else {
        console.log('✅ Service Worker registered', registration);
      }
    },
    [],
  );

  const onRegisterError = useCallback((error: unknown) => {
    console.error('🛑 Service Worker registration error', error);
  }, []);

  const [t] = useI18n();
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // immediate: true,
    onRegisteredSW,
    onRegisterError,
  });

  // listens to reload prompt SW
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (offlineReady || needRefresh) {
      toast(offlineReady ? t('appReady') : t('newContentAvailable'), {
        closeButton: true,
        duration: 60 * 1_000,
        onDismiss: () => {
          setOfflineReady(false);
          setNeedRefresh(false);
        },
        ...(needRefresh && {
          action: {
            label: t('reload'),
            onClick: () => updateServiceWorker(true),
          },
        }),
      });
    }
  }, [offlineReady, needRefresh]);

  return (
    <aside id="ReloadPromptSW" className="hidden">
      {buildDate}
    </aside>
  );
}
