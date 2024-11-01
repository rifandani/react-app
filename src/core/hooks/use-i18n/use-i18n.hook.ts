import { localeDict } from '#/core/hooks/use-i18n/locales';
import type { Formatter } from '#/core/hooks/use-i18n/locales/locale.type';
import { I18nContext } from '#/core/providers/i18n/context';
import { useContext } from 'react';
import { useMessageFormatter } from 'react-aria';

export function useI18n() {
  const formatter: Formatter = useMessageFormatter(localeDict);
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n: cannot find the I18nContext');

  // we don't include `context[0]`, because it's already covered using `useLocale`
  return [formatter, context[1]] as const;
}
