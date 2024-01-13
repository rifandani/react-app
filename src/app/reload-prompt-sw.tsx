import { useCallback } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { pwaInfo } from 'virtual:pwa-info'

// eslint-disable-next-line no-console
console.log(`🐫 ~ "reload-prompt-sw.tsx" at line 3: pwaInfo -> `, { pwaInfo })

export function ReloadPromptSw() {
  // replaced dynamically
  const buildDate = '__DATE__'
  // replaced dynamically
  const reloadSW = '__RELOAD_SW__' as '__RELOAD_SW__' | 'true'

  const onRegisteredSW = useCallback(
    (_swUrl: string, registration: ServiceWorkerRegistration | undefined) => {
      // in `vite.config.ts`, the `reloadSW` could be `'true'` if `process.env.RELOAD_SW === 'true'`
      if (reloadSW === 'true' && registration) {
        setInterval(() => {
          // eslint-disable-next-line no-console
          console.log('🔵 Updating Service Worker...')
          void registration.update()
        }, 10_000 /* 10s for testing purposes */)
      }
    },
    [],
  )

  const onRegisterError = useCallback((error: unknown) => {
    console.error('🛑 Service Worker registration error', error)
  }, [])

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW,
    onRegisterError,
  })

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
              onClick={() => {
                setOfflineReady(false)
                setNeedRefresh(false)
              }}
            >
              Close
            </button>

            {needRefresh && (
              <button
                type="button"
                className="btn btn-primary btn-sm w-1/2"
                onClick={() => updateServiceWorker(true)}
              >
                Reload
              </button>
            )}
          </section>
        </div>
      )}

      <span className="hidden">{buildDate}</span>
    </aside>
  )
}
