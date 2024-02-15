import { useContext } from 'react';
import { useMessageFormatter } from 'react-aria';
import { I18nContext } from '#app/providers/i18n/context';
import { localeDict } from '#shared/locales';
import type { Formatter } from '#shared/locales/locale.type';

export function useI18n() {
  const formatter: Formatter = useMessageFormatter(localeDict);
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n: cannot find the I18nContext');

  // we don't include `context[0]`, because it's already covered using `useLocale`
  return [formatter, context[1]] as const;
}
