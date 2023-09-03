import { todosPath } from '@todo/routes/todos.route';
import { Link } from 'react-router-dom';
import useTodoPageVM from './Todo.vm';

export default function TodoPage() {
  const { t, user, fetcher, todoQuery, form, onSubmit } = useTodoPageVM();

  return (
    <section className="flex flex-col justify-center px-10 py-20 md:px-24 lg:px-40 xl:px-52">
      <div className="mb-10 flex w-full flex-col space-y-2">
        <Link
          to={todosPath.root}
          aria-label="go-back"
          className="btn-link w-fit normal-case text-primary-content "
        >
          ⬅ {t('goBackTo', { target: 'Todos' })}
        </Link>

        <h1 className="text-2xl font-semibold tracking-wider text-primary-content">
          {t('xDetail', { feature: 'Todo' })}
        </h1>
      </div>

      {/* <Show when={todoUpdateMutation.isError}>
        <div
          data-testid="todo-mutationError"
          className="alert alert-error mt-2 shadow-lg"
        >
          <div className="flex items-center">
            <span>
              {t('error', { module: 'Todo Mutation' })}:{' '}
              {(todoUpdateMutation.error as Error).message}
            </span>
          </div>
        </div>
      </Show> */}

      {todoQuery.isError && (
        <div
          data-testid="todo-error"
          className="alert alert-error mt-2 shadow-lg"
        >
          <div className="flex items-center">
            <span>{t('error', { module: 'Todos' })}:</span>
            <pre>{JSON.stringify(todoQuery.error, null, 2)}</pre>
          </div>
        </div>
      )}

      {todoQuery.data && (
        <form
          aria-label="form-todo"
          className="join"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <input
            id="todo"
            type="text"
            aria-label="textbox-todo"
            className="input join-item input-bordered input-accent w-full text-accent-content"
            {...form.register('todo', { required: true })}
          />

          {user?.id === todoQuery.data.userId && (
            <button
              aria-label="button-submit"
              className="btn btn-accent join-item normal-case"
              type="submit"
              disabled={fetcher.state === 'submitting'}
            >
              {t('update', { icon: '🖋' })}
            </button>
          )}
        </form>
      )}
    </section>
  );
}
