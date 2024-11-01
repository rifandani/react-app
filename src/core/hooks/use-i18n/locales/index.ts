import { enLocale } from './en.locale';
import { idLocale } from './id.locale';
import type { LocaleDict } from './locale.type';

const localeDict: LocaleDict = {
  'en-US': enLocale,
  'id-ID': idLocale,
} as const;

export { enLocale, idLocale, localeDict };
