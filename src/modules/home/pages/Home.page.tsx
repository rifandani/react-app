import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ClockSection } from '@home/components/clock-section/clock-section';
import { useI18n } from '@shared/hooks/use-i18n.hook';

export function HomePage() {
  const [t] = useI18n();
  const [parentRef] = useAutoAnimate();

  return (
    <main
      ref={parentRef}
      className="container mx-auto flex flex-col items-center py-24 duration-300"
    >
      <h1 className="text-3xl font-medium sm:text-4xl">{t('title')}</h1>

      <ClockSection />
    </main>
  );
}
