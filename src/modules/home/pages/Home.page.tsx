import HomeClock from '@home/components/HomeClock.component';
import useHomePageVM from './Home.vm';

export default function HomePage() {
  const { t } = useHomePageVM();

  return (
    <main className="container mx-auto flex flex-col items-center py-24 text-primary-content duration-300">
      <h1 className="text-3xl font-medium text-primary-content sm:text-4xl">
        {t('title')}
      </h1>

      <HomeClock />
    </main>
  );
}
