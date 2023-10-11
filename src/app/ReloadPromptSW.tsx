import { useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPromptSW() {
  // replaced dynamically
  const buildDate = '__DATE__';
  // replaced dynamically
  const reloadSW = '__RELOAD_SW__';

  const onRegisteredSW = useCallback(
    (_swUrl: string, registration: ServiceWorkerRegistration | undefined) => {
      // @ts-expect-error just ignore
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (reloadSW === 'true' && registration) {
        setInterval(() => {
          // eslint-disable-next-line no-console
          console.log('🔵 Checking for Service Worker updates...');
          void registration.update();
        }, 20_000 /* 20s for testing purposes */);
      }
    },
    [],
  );

  const onRegisterError = useCallback((error: unknown) => {
    // eslint-disable-next-line no-console
    console.error('🛑 Service Worker registration error', error);
  }, []);

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW,
    onRegisterError,
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <aside id="ReloadPromptSW" className="fixed bottom-5 right-5 rounded p-3">
      {(offlineReady || needRefresh) && (
        <div className="border-1 m-4 rounded bg-white text-left shadow-md">
          <div className="mb-2">
            <span>
              {offlineReady
                ? 'App ready to work offline'
                : 'New content available, click on reload button to update'}
            </span>
          </div>

          {needRefresh && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                void updateServiceWorker(true);
              }}
            >
              Reload
            </button>
          )}

          <button type="button" className="btn-outlined btn" onClick={close}>
            Close
          </button>
        </div>
      )}

      <span className="invisible">{buildDate}</span>
    </aside>
  );
}
