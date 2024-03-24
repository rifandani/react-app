import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { TodoListApiResponseSchema } from '#todo/apis/todo.api';
import { TodosListItem } from '#todo/components/todos-list-item';
import { useTodos } from '#todo/hooks/use-todos.hook';
import { Icon } from '@iconify/react';
import { GridList } from 'react-aria-components';
import { useLoaderData } from 'react-router-dom';
import { match } from 'ts-pattern';

export function TodosList() {
  const [t] = useI18n();
  const initialData = useLoaderData() as TodoListApiResponseSchema;
  const todosQuery = useTodos({ initialData });

  return (
    <>
      {match(todosQuery)
        .with({ isFetching: true }, { isLoading: true }, () => (
          <div
            aria-label="Todo list query loading spinner"
            className="flex items-center justify-center py-5"
          >
            <Icon
              icon="svg-spinners:3-dots-fade"
              height="5em"
              className="text-primary"
            />
          </div>
        ))
        .with({ isError: true }, ({ error }) => (
          <div
            role="alert"
            aria-label="Todo list query error"
            className="mt-2 bg-destructive p-2 rounded-md flex items-center gap-x-3 shadow-md w-full"
          >
            <Icon icon="lucide:alert-circle" />

            <span className="flex flex-col">
              <p className="">{t('error', { module: 'Todos' })}:</p>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </span>
          </div>
        ))
        .with({ isSuccess: true }, ({ data }) => (
          <GridList
            aria-label="Todo grid list with multiple checkbox selection and toggle behavior"
            selectionMode="multiple"
            selectionBehavior="toggle"
            items={data.todos}
            renderEmptyState={() => (
              <h2 className="flex items-center justify-center py-5">
                {t('empty')}
              </h2>
            )}
          >
            {(todo) => <TodosListItem todo={todo} />}
          </GridList>
        ))
        .otherwise(() => null)}
    </>
  );
}
