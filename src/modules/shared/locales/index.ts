import { authEnLocale, authIdLocale } from './_auth.locale';
import { commonEnLocale, commonIdLocale } from './_common.locale';
import { homeEnLocale, homeIdLocale } from './_home.locale';
import { playgroundEnLocale, playgroundIdLocale } from './_playground.locale';
import { todoEnLocale, todoIdLocale } from './_todo.locale';
import type { LocaleDict } from './locale.type';

export const enLocale = {
  ...commonEnLocale,
  ...authEnLocale,
  ...playgroundEnLocale,
  ...homeEnLocale,
  ...todoEnLocale,
} as const;

export const idLocale = {
  ...commonIdLocale,
  ...authIdLocale,
  ...playgroundIdLocale,
  ...homeIdLocale,
  ...todoIdLocale,
} as const;

export const localeDict: LocaleDict = {
  'en-US': enLocale,
  'id-ID': idLocale,
} as const;
