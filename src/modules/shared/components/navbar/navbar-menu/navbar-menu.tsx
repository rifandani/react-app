import { Button, useLocale } from 'react-aria-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'
import { Icon } from '@iconify/react'
import { useUserStore } from '#auth/hooks/use-user-store.hook'
import { authPath } from '#auth/routes'
import { modes, themes } from '#shared/constants/theme.constant'
import { useColorMode } from '#shared/hooks/use-color-mode.hook'
import { useI18n } from '#shared/hooks/use-i18n.hook'
import { todosPath } from '#todo/routes'

const flags = [
  {
    id: 'id-ID',
    icon: 'flag:id-1x1',
    label: 'Indonesia',
  },
  {
    id: 'en-US',
    icon: 'flag:us-1x1',
    label: 'English (US)',
  },
] as const

export function NavbarMenu() {
  const { locale } = useLocale()
  const navigate = useNavigate()
  const [t, { changeLocale }] = useI18n()
  const { user, clearUser } = useUserStore()
  const [, setTheme] = useColorMode({
    modes,
    attribute: 'data-theme',
  })

  return (
    <>
      <li>
        <NavLink
          to={todosPath.root}
          aria-label="todos"
          className={({ isActive, isPending }) =>
            twJoin(
              'link mx-0 px-3 tracking-wide lg:mx-3',
              isActive && 'link-hover',
              isPending && 'link-neutral',
          )}
        >
          Todos
        </NavLink>
      </li>

      <li className="dropdown dropdown-top mb-3 mt-auto lg:dropdown-end lg:dropdown-bottom lg:my-0">
        <Button
          type="button"
          aria-label="themes-opener"
          className="btn btn-outline btn-sm btn-block normal-case"
        >
          {t('theme')}
        </Button>

        <ul className="menu dropdown-content z-10 block max-h-60 w-72 overflow-y-auto rounded-box bg-base-200 p-2 shadow lg:w-52">
          {themes.map(theme => (
            <li key={theme}>
              <Button
                type="button"
                className="capitalize tracking-wide"
                aria-label={`theme-${theme}`}
                onPress={() => {
                  setTheme(theme)
                }}
              >
                {theme}
              </Button>
            </li>
          ))}
        </ul>
      </li>

      <li className="dropdown dropdown-top mb-3 lg:dropdown-end lg:dropdown-bottom lg:my-0 lg:ml-3">
        <Button
          type="button"
          aria-label="themes-opener"
          className="btn btn-outline btn-sm btn-block normal-case"
        >
          <Icon icon="lucide:globe" />
        </Button>

        <ul className="menu dropdown-content z-10 block max-h-60 w-72 overflow-y-auto rounded-box bg-base-200 p-2 shadow lg:w-52">
          {flags.map(flag => (
            <li key={flag.id}>
              <Button
                type="button"
                className={twJoin('capitalize tracking-wide flex items-center gap-3', locale === flag.id && 'active')}
                aria-label={`theme-${flag.id}`}
                onPress={() => changeLocale(flag.id)}
              >
                <Icon icon={flag.icon} />
                {flag.label}
              </Button>
            </li>
          ))}
        </ul>
      </li>

      {!!user && (
        <li className="ml-0 lg:ml-3 lg:mt-0">
          <Button
            type="button"
            className="btn btn-error btn-sm normal-case tracking-wide text-error-content"
            onPress={() => {
              clearUser() // clear user store
              navigate(authPath.login) // back to login page
            }}
          >
            {`${t('logout')} (${user.username})`}
          </Button>
        </li>
      )}
    </>
  )
}
