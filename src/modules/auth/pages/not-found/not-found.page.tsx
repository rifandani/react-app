import { Link } from 'react-router-dom'
import { useUserStore } from '#auth/hooks/use-user-store.hook'
import { authPath } from '#auth/routes/auth.route'
import { homePath } from '#home/routes/home.route'
import { modes } from '#shared/constants/theme.constant'
import { useColorMode } from '#shared/hooks/use-color-mode.hook'
import { useI18n } from '#shared/hooks/use-i18n.hook'

export function NotFoundPage() {
  const userStore = useUserStore()
  const [t] = useI18n()
  useColorMode({
    modes,
    attribute: 'data-theme',
  })

  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-3 bg-base-100">
      <h1 className="text-3xl font-bold italic">{t('notFound404')}</h1>
      <p className="mb-5">{t('gone')}</p>

      <Link
        to={userStore.user ? homePath.root : authPath.login}
        className="link hover:skew-x-12"
      >
        {t('goBackTo', { target: userStore.user ? 'home' : 'login' })}
      </Link>
    </main>
  )
}
