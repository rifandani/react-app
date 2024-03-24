import { Button } from '#shared/components/ui/button';
import {
  Menu,
  MenuHeader,
  MenuPopover,
  MenuRadioItem,
  MenuSection,
  MenuTrigger,
} from '#shared/components/ui/menu';
import {
  useColorMode,
  type BasicColorMode,
} from '#shared/hooks/use-color-mode.hook';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { useToaster } from '#shared/hooks/use-toaster.hook';
import { Icon } from '@iconify/react';
import type { Selection } from 'react-aria-components';

export function NavbarMenuTheme() {
  const [t] = useI18n();
  const [_, { setProps }] = useToaster();
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
              currentKey: 'auto' | BasicColorMode;
            };
            setTheme(selection.currentKey);
            setProps((prev) => ({
              ...prev,
              theme:
                selection.currentKey === 'auto'
                  ? 'system'
                  : selection.currentKey,
            }));
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
