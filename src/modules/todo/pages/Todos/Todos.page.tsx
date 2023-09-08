import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import TodosCreate from '@todo/components/TodosCreate/TodosCreate.component';
import TodosFilter from '@todo/components/TodosFilter/TodosFilter.component';
import TodosList from '@todo/components/TodosList/TodosList.component';

export default function TodosPage() {
  const [t] = useI18n();

  return (
    <main className="flex flex-col items-center justify-center px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1 className="mb-10 text-2xl font-semibold tracking-wider">
        {t('xList', { feature: 'Todo' })}
      </h1>

      <section className="card w-full bg-base-200 p-5 shadow-lg">
        <TodosCreate />

        <TodosFilter />

        <TodosList />
      </section>
    </main>
  );
}
