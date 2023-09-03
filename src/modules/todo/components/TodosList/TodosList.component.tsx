import { Icon } from '@iconify/react/dist/iconify.js';
import { For } from '@shared/components/atoms';
import TodosItem from '../TodosItem/TodosItem.component';
import useTodosList from './useTodosList.hook';

export default function TodosList() {
  const { t, todosQuery } = useTodosList();

  return (
    <>
      {todosQuery.isLoading && (
        <div
          data-testid="list-loading"
          className="flex items-center justify-center py-5"
        >
          <Icon
            icon="svg-spinners:3-dots-fade"
            height="5em"
            className="text-secondary-content"
          />
        </div>
      )}

      {todosQuery.isError && (
        <div
          data-testid="list-error"
          className="alert alert-error mt-2 shadow-lg"
        >
          <div className="flex items-center">
            <span>{t('error', { module: 'Todos' })}:</span>
            <pre>{JSON.stringify(todosQuery.error, null, 2)}</pre>
          </div>
        </div>
      )}

      {todosQuery.isSuccess && (
        <For
          each={todosQuery.data.todos}
          fallback={
            <div
              data-testid="list-empty"
              className="flex items-center justify-center py-5"
            >
              {t('empty')}
            </div>
          }
        >
          {(todo) => <TodosItem key={todo.id} todo={todo} />}
        </For>
      )}
    </>
  );
}
