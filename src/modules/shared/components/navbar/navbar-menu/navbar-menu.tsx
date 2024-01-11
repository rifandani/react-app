import { Button } from 'react-aria-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'
import { useUserStore } from '#auth/hooks/use-user-store.hook'
import { authPath } from '#auth/routes'
import { modes, themes } from '#shared/constants/theme.constant'
import { useColorMode } from '#shared/hooks/use-color-mode.hook'
import { useI18n } from '#shared/hooks/use-i18n.hook'
import { todosPath } from '#todo/routes'

export function NavbarMenu() {
  const [t] = useI18n()
  const navigate = useNavigate()
  const { user, clearUser } = useUserStore()
  const [, setTheme] = useColorMode({
    modes,
    attribute: 'data-theme',
  })

  // #region HANDLERS
  const handleClickLogout = () => {
    clearUser() // clear user store
    navigate(authPath.login) // back to login page
  }
  // #endregion

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

      {!!user && (
        <li className="ml-0 lg:ml-3 lg:mt-0">
          <Button
            type="button"
            className="btn btn-error btn-sm normal-case tracking-wide text-error-content"
            onPress={handleClickLogout}
          >
            {t('logout')}
            {' '}
            (
            {user.username}
            )
          </Button>
        </li>
      )}
    </>
  )
}
