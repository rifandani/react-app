import React, { createContext, useState } from 'react';

export type LocaleDictLanguage = 'en-US' | 'id-ID';
export type I18nContextInterface = ReturnType<typeof useI18nContext>;

// It's extracted into a function to be able to type the Context before it's even initialized.
export function useI18nContext() {
  const [locale, setLocale] = useState<LocaleDictLanguage>('en-US');

  const actions = React.useMemo(
    () => ({
      changeLocale: (newLocale: LocaleDictLanguage) => {
        setLocale(newLocale);
      },
    }),
    [],
  );

  return React.useMemo(() => [locale, actions] as const, [locale, actions]);
}

export const I18nContext = createContext<I18nContextInterface>(
  {} as I18nContextInterface,
);
