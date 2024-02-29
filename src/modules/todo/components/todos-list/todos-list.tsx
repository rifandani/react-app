import { For } from '#shared/components/for/for';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { TodoListApiResponseSchema } from '#todo/apis/todo.api';
import { TodosItem } from '#todo/components/todos-item/todos-item';
import { useTodos } from '#todo/hooks/use-todos.hook';
import { Icon } from '@iconify/react';
import { useLoaderData } from 'react-router-dom';
import { match } from 'ts-pattern';

export function TodosList() {
  const [t] = useI18n();
  const initialData = useLoaderData() as TodoListApiResponseSchema;
  const todosQuery = useTodos({ initialData });

  return (
    <>
      {match(todosQuery)
        .with({ isLoading: true }, () => (
          <div
            data-testid="list-loading"
            className="flex items-center justify-center py-5"
          >
            <Icon
              icon="svg-spinners:3-dots-fade"
              height="5em"
              className="text-primary-content"
            />
          </div>
        ))
        .with({ isError: true }, ({ error }) => (
          <div
            data-testid="list-error"
            className="alert alert-error mt-2 shadow-lg"
          >
            <div className="flex items-center">
              <span>{t('error', { module: 'Todos' })}:</span>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          </div>
        ))
        .with({ isSuccess: true }, ({ data }) => (
          <For
            each={data.todos}
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
        ))
        .otherwise(() => null)}
    </>
  );
}
