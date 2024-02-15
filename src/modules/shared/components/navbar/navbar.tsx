import { Icon } from '@iconify/react';
import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { NavbarMenu } from './navbar-menu/navbar-menu';
import { useI18n } from '#shared/hooks/use-i18n.hook';
import { SvgIcon } from '#shared/components/svg-icon/svg-icon';
import { homePath } from '#home/routes';

export function Navbar({ children }: PropsWithChildren) {
  const [t] = useI18n();

  return (
    <nav className="drawer min-h-screen">
      <input
        id="my-nav-drawer"
        type="checkbox"
        aria-label="drawer"
        className="drawer-toggle"
      />

      <section className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="navbar w-full shadow-md">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-nav-drawer" className="btn btn-square btn-ghost">
              <Icon icon="lucide:menu" height="2em" />
            </label>
          </div>

          <Link
            to={homePath.root}
            aria-label="logo"
            className="link mx-2 flex flex-1 items-center space-x-2 px-2 text-2xl"
          >
            <SvgIcon id="icon-reactjs" className="size-6" />
            <p className="font-semibold tracking-wider">{t('appName')}</p>
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
        <label htmlFor="my-nav-drawer" className="drawer-overlay" />

        <ul className="menu h-full w-80 bg-base-100 p-4">
          {/* <!-- Sidebar content here --> */}
          <NavbarMenu />
        </ul>
      </section>
    </nav>
  );
}
