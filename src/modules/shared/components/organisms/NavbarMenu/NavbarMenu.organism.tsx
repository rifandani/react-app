import { themes } from '@shared/constants/theme.constant';
import { todosPath } from '@todo/routes/todos.route';
import { NavLink } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import useNavbarMenu from './useNavbarMenu.hook';

export default function NavbarMenu() {
  const { t, user, handleClickLogout } = useNavbarMenu();

  return (
    <>
      <li>
        <NavLink
          to={todosPath.root}
          aria-label="todos"
          className={({ isActive, isPending }) =>
            twJoin(
              'link-hover link mx-0 px-3 tracking-wide text-primary lg:mx-3',
              isActive && 'link-secondary',
              isPending && 'link-neutral',
            )
          }
        >
          Todos
        </NavLink>
      </li>

      <li className="dropdown dropdown-top mb-3 mt-auto lg:dropdown-end lg:dropdown-bottom lg:my-0">
        <button
          type="button"
          tabIndex={0}
          aria-label="themes-opener"
          className="btn btn-secondary btn-sm btn-block normal-case text-secondary-content"
        >
          {t('theme')}
        </button>

        <ul className="menu dropdown-content rounded-box z-10 block max-h-60 w-72 overflow-y-auto bg-secondary p-2 text-secondary-content shadow lg:w-52">
          {themes.map((theme) => (
            <li key={theme}>
              <button
                type="button"
                className="capitalize tracking-wide"
                aria-label={`theme-${theme}`}
                // onClick={() => setTheme(theme)}
              >
                {theme}
              </button>
            </li>
          ))}
        </ul>
      </li>

      {!!user && (
        <li className="ml-0 lg:ml-3 lg:mt-0">
          <button
            type="button"
            className="btn btn-primary btn-sm normal-case tracking-wide text-primary-content"
            onClick={handleClickLogout}
          >
            {t('logout')} ({user.username})
          </button>
        </li>
      )}
    </>
  );
}
