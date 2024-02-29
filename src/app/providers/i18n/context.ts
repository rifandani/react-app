import type { LocaleDictLanguage } from '#shared/hooks/use-i18n/locales/locale.type';
import { createContext, useState } from 'react';

export type I18nContextInterface = ReturnType<typeof useI18nContext>;

// It's extracted into a function to be able to type the Context before it's even initialized.
export function useI18nContext() {
  const [locale, setLocale] = useState<LocaleDictLanguage>('en-US');

  const actions = {
    changeLocale: (newLocale: LocaleDictLanguage) => {
      setLocale(newLocale);
    },
  };

  return [locale, actions] as const;
}

export const I18nContext = createContext<I18nContextInterface>(
  {} as I18nContextInterface,
);
