import { homeRoute } from '@home/routes/home.route';
import { Icon } from '@iconify/react';
import { SvgIcon } from '@shared/components/atoms';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from '../NavbarMenu/NavbarMenu.organism';
import useNavbar from './useNavbar.hook';

export default function Navbar({ children }: PropsWithChildren) {
  const { t } = useNavbar();

  return (
    <nav className="drawer min-h-screen text-primary-content">
      <input
        id="my-nav-drawer"
        type="checkbox"
        aria-label="drawer"
        className="drawer-toggle"
      />

      <section className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="navbar w-full bg-base-300">
          <div className="flex-none lg:hidden">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="my-nav-drawer" className="btn btn-square btn-ghost">
              <Icon
                icon="lucide:menu"
                height="2em"
                className="text-primary-content"
              />
            </label>
          </div>

          <Link
            to={homeRoute.path}
            aria-label="logo"
            className="link-primary link mx-2 flex-1 px-2"
          >
            <span className="flex items-center space-x-2 pl-2 text-2xl">
              <SvgIcon id="icon-reactjs" className="h-6 w-6" />
              <p className="font-semibold tracking-wider text-primary">
                {t('appName')}
              </p>
            </span>
          </Link>

          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* <!-- Navbar menu content here --> */}
              <NavbarMenu />
            </ul>
          </div>
        </div>

        {/* <!-- Page content here --> */}
        {children ?? <h1 className="text-lg/10">{t('noPageContent')}</h1>}
      </section>

      <section className="drawer-side">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="my-nav-drawer" className="drawer-overlay" />

        <ul className="menu h-full w-80 bg-base-200 p-4">
          {/* <!-- Sidebar content here --> */}
          <NavbarMenu />
        </ul>
      </section>
    </nav>
  );
}
