import { I18nContext } from '@app/providers/i18n/context';
import { localeDict } from '@shared/configs/locale/locale.config';
import { Formatter } from '@shared/configs/locale/locale.type';
import { useContext } from 'react';
import { useMessageFormatter } from 'react-aria';

export default function useI18n() {
  const formatter: Formatter = useMessageFormatter(localeDict);
  const context = useContext(I18nContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error('useI18n: cannot find the I18nContext');
  }

  // we don't include `context[0]`, because it's already covered using `useLocale`
  return [formatter, context[1]] as const;
}
