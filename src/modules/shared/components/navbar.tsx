import type { LocaleDictLanguage } from '#app/providers/i18n/context';
import { useUserStore } from '#auth/hooks/use-user-store.hook';
import { authPath, loginRoute } from '#auth/routes';
import { homeRoute } from '#home/routes';
import { playgroundRoute } from '#playground/routes';
import { SvgIcon } from '#shared/components/svg-icon';
import { Avatar, AvatarFallback } from '#shared/components/ui/avatar';
import { Button } from '#shared/components/ui/button';
import {
  Menu,
  MenuHeader,
  MenuItem,
  MenuPopover,
  MenuRadioItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from '#shared/components/ui/menu';
import {
  useColorMode,
  type BasicColorMode,
} from '#shared/hooks/use-color-mode.hook';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { todosRoute } from '#todo/routes';
import { Icon } from '@iconify/react';
import { Link, useLocale, type Selection } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTrigger,
} from './ui/dialog';

function NavbarMenuLanguage() {
  const { locale } = useLocale();
  const [t, { changeLocale }] = useI18n();

  return (
    <MenuTrigger>
      <Button size="icon" variant="outline">
        <Icon
          icon={locale === 'en-US' ? 'flag:us-1x1' : 'flag:id-1x1'}
          className="size-6"
        />
      </Button>

      <MenuPopover>
        <Menu
          selectionMode="single"
          selectedKeys={new Set([locale])}
          onSelectionChange={(_selection) => {
            const selection = _selection as Exclude<Selection, 'all'> & {
              currentKey: LocaleDictLanguage;
            };
            changeLocale(selection.currentKey);
          }}
        >
          <MenuSection>
            <MenuHeader separator>{t('language')}</MenuHeader>

            <MenuRadioItem id="en-US">English</MenuRadioItem>
            <MenuRadioItem id="id-ID">Indonesia</MenuRadioItem>
          </MenuSection>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  );
}

function NavbarMenuTheme() {
  const [t] = useI18n();
  const [theme, setTheme] = useColorMode({});

  return (
    <MenuTrigger>
      <Button size="icon" variant="outline">
        <Icon
          icon={
            theme === 'auto'
              ? 'lucide:computer'
              : theme === 'light'
                ? 'lucide:sun'
                : 'lucide:moon'
          }
          className="size-6"
        />
      </Button>

      <MenuPopover>
        <Menu
          selectionMode="single"
          selectedKeys={new Set([theme as string])}
          onSelectionChange={(_selection) => {
            const selection = _selection as Exclude<Selection, 'all'> & {
              currentKey: BasicColorMode;
            };
            setTheme(selection.currentKey);
          }}
        >
          <MenuSection>
            <MenuHeader separator>{t('theme')}</MenuHeader>

            <MenuRadioItem id="auto">{t('system')}</MenuRadioItem>
            <MenuRadioItem id="light">{t('light')}</MenuRadioItem>
            <MenuRadioItem id="dark">{t('dark')}</MenuRadioItem>
          </MenuSection>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  );
}

function NavbarMenuProfile() {
  const [t] = useI18n();
  const navigate = useNavigate();
  const { user, clearUser } = useUserStore();

  return (
    <MenuTrigger>
      <Button size="icon" variant="ghost" className="rounded-full">
        <Avatar>
          <AvatarFallback>
            {user?.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Button>

      <MenuPopover>
        <Menu
          selectionMode="single"
          onSelectionChange={(_selection) => {
            const selection = _selection as Exclude<Selection, 'all'> & {
              currentKey: 'profile' | 'settings' | 'logout';
            };

            if (selection.currentKey === 'logout') {
              clearUser(); // clear user store
              navigate(authPath.login); // back to login page
            }
          }}
        >
          <MenuSection>
            <MenuHeader separator>{t('account')}</MenuHeader>

            <MenuItem id="profile" className="gap-x-2">
              <Icon icon="lucide:user" />
              <span>{t('profile')}</span>
            </MenuItem>
            <MenuItem id="settings" className="gap-x-2">
              <Icon icon="lucide:settings" />
              <span>{t('settings')}</span>
            </MenuItem>
          </MenuSection>

          <MenuSeparator />

          <MenuSection>
            <MenuItem id="logout" className="gap-x-2">
              <Icon icon="lucide:log-out" />
              <p>{t('logout')}</p>
            </MenuItem>
          </MenuSection>
        </Menu>
      </MenuPopover>
    </MenuTrigger>
  );
}

export function Navbar() {
  const [t] = useI18n();
  const navigate = useNavigate();
  const { user, clearUser } = useUserStore();

  return (
    <nav className="flex items-center justify-between border-b p-2.5 shadow-sm">
      <Link href={homeRoute.path} className="flex items-center">
        <SvgIcon id="icon-reactjs" className="size-6" />
        <span className="ml-2 text-2xl font-semibold">{t('appName')}</span>
      </Link>

      <section className="hidden items-center gap-x-2 sm:flex">
        <NavbarMenuLanguage />
        <NavbarMenuTheme />
        <NavbarMenuProfile />
      </section>

      <DialogTrigger>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Icon icon="lucide:menu" className="size-6" />
        </Button>

        <DialogOverlay>
          <DialogContent
            side="left"
            className="flex w-[400px] flex-col justify-between"
            dialogClassName="flex flex-col justify-between"
          >
            <DialogHeader className="text-left">
              <SvgIcon id="icon-reactjs" className="mb-6 size-6" />

              <Link href={homeRoute.path}>Home</Link>
              <Link href={todosRoute.path}>Todos</Link>
              <Link href={playgroundRoute.path}>Playground</Link>
            </DialogHeader>

            <DialogFooter>
              <Button
                className="gap-x-2"
                onPress={() => {
                  clearUser(); // reset `user` store
                  navigate(loginRoute.path); // back to login
                }}
              >
                <Icon icon="lucide:log-out" />
                {t('logout')} ({user?.username ?? 'Unknown'})
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>
    </nav>
  );
}
