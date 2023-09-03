import { I18nContext } from '@app/providers/i18n/I18nProvider';
import { localeDict } from '@shared/configs/locale/locale.config';
import { useContext } from 'react';
import { useMessageFormatter } from 'react-aria';

export default function useI18n() {
  const formatter = useMessageFormatter(localeDict);
  const context = useContext(I18nContext);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error('useI18n: cannot find the I18nContext');
  }

  return [formatter, context[1]] as const;
}
