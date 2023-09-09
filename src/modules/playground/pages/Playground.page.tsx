import { modes } from '@shared/constants/theme.constant';
import { useColorMode } from '@shared/hooks/useColorMode/useColorMode.hook';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';

export default function Playground() {
  useColorMode({
    modes,
    attribute: 'data-theme',
  });
  const [t] = useI18n();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-5 px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1
        data-testid="title"
        className="mb-10 text-2xl font-semibold tracking-wider"
      >
        {t('playgroundTitle')}
      </h1>
    </main>
  );
}
