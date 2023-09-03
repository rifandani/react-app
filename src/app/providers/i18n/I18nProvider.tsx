import { LocaleDictLanguage } from '@shared/configs/locale/locale.type';
import { PropsWithChildren, createContext, useState } from 'react';
import { I18nProvider as AriaI18nProvider } from 'react-aria';

export type I18nContextInterface = ReturnType<typeof useI18nContext>;

// It's extracted into a function to be able to type the Context before it's even initialized.
const useI18nContext = () => {
  const [locale, setLocale] = useState<LocaleDictLanguage>('en-US');

  const actions = {
    changeLocale: (newLocale: LocaleDictLanguage) => {
      setLocale(newLocale);
    },
  };

  return [locale, actions] as const;
};

export const I18nContext = createContext<I18nContextInterface>(
  {} as I18nContextInterface,
);

export default function I18nProvider({ children }: PropsWithChildren) {
  const value = useI18nContext();

  return (
    <I18nContext.Provider value={value}>
      <AriaI18nProvider locale={value[0]}>{children}</AriaI18nProvider>
    </I18nContext.Provider>
  );
}
