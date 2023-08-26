import { localeDict } from '@shared/configs/locale/locale.config';
import { useMessageFormatter } from 'react-aria';

export default function useI18n() {
  const formatter = useMessageFormatter(localeDict);

  return formatter;
}
