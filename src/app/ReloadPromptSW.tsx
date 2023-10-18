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

  const reloadAndUpdateSW = () => {
    void updateServiceWorker(true);
  };

  return (
    <aside id="ReloadPromptSW" className="toast">
      {(offlineReady || needRefresh) && (
        <div className="alert relative block min-w-[20rem] max-w-[20rem] overflow-hidden p-3 shadow-lg">
          <h3 className="line-clamp-3 whitespace-pre-wrap break-words pb-3">
            {offlineReady
              ? 'App ready to work offline'
              : 'New content available, click on reload button to update'}
          </h3>

          <section className="flex justify-between">
            <button
              type="button"
              className="btn-outlined btn btn-sm w-1/2"
              onClick={close}
            >
              Close
            </button>

            {needRefresh && (
              <button
                type="button"
                className="btn btn-primary btn-sm w-1/2"
                onClick={reloadAndUpdateSW}
              >
                Reload
              </button>
            )}
          </section>
        </div>
      )}

      <span className="hidden">{buildDate}</span>
    </aside>
  );
}
