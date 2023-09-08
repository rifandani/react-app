import { themes } from '@shared/constants/theme.constant';
import { todosPath } from '@todo/routes/todos.route';
import { NavLink } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import useNavbarMenu from './useNavbarMenu.hook';

export default function NavbarMenu() {
  const { t, user, setTheme, handleClickLogout } = useNavbarMenu();

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
          className="btn btn-outline btn-sm btn-block normal-case"
        >
          {t('theme')}
        </button>

        <ul className="menu dropdown-content rounded-box z-10 block max-h-60 w-72 overflow-y-auto bg-base-200 p-2 shadow lg:w-52">
          {themes.map((theme) => (
            <li key={theme}>
              <button
                type="button"
                className="capitalize tracking-wide"
                aria-label={`theme-${theme}`}
                onClick={() => {
                  setTheme(theme);
                }}
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
            className="btn btn-error btn-sm normal-case tracking-wide text-error-content"
            onClick={handleClickLogout}
          >
            {t('logout')} ({user.username})
          </button>
        </li>
      )}
    </>
  );
}
