import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'react-aria-components'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Link, useFetcher, useLoaderData, useParams } from 'react-router-dom'
import { useUserStore } from '#auth/hooks/use-user-store.hook'
import { useI18n } from '#shared/hooks/use-i18n.hook'
import { useTodo } from '#todo/hooks/use-todo.hook'
import { todosPath } from '#todo/routes'
import type {
  TodoDetailApiResponseSchema,
  UpdateTodoSchema,
} from '#todo/schemas/todo.schema'
import { updateTodoSchema } from '#todo/schemas/todo.schema'

export function TodoPage() {
  const [t] = useI18n()
  const { id } = useParams()
  const fetcher = useFetcher()
  const initialData = useLoaderData() as TodoDetailApiResponseSchema
  const { user } = useUserStore()
  const todoQuery = useTodo(Number(id), { initialData })

  const form = useForm<UpdateTodoSchema>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      id: initialData.id,
      completed: initialData.completed,
      todo: initialData.todo,
    },
  })

  // #region HANDLERS
  const onSubmit: SubmitHandler<UpdateTodoSchema> = (values) => {
    fetcher.submit(values, { method: 'PUT', encType: 'application/json' })
  }
  // #endregion

  return (
    <section className="flex flex-col justify-center px-10 py-20 md:px-24 lg:px-40 xl:px-52">
      <div className="mb-10 flex w-full flex-col space-y-2">
        <Link
          to={todosPath.root}
          aria-label="go-back"
          className="link w-fit normal-case hover:skew-x-12"
        >
          ⬅
          {' '}
          {t('goBackTo', { target: 'Todos' })}
        </Link>

        <h1 className="text-2xl font-semibold tracking-wider">
          {t('xDetail', { feature: 'Todo' })}
        </h1>
      </div>

      {todoQuery.isError && (
        <div
          data-testid="todo-error"
          className="alert alert-error mt-2 shadow-lg"
        >
          <div className="flex items-center">
            <span>
              {t('error', { module: 'Todos' })}
              :
            </span>
            <pre>{JSON.stringify(todoQuery.error, null, 2)}</pre>
          </div>
        </div>
      )}

      {todoQuery.data && (
        <form
          aria-label="form-todo"
          className="join"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <input
            id="todo"
            type="text"
            aria-label="textbox-todo"
            className="input join-item input-bordered input-primary w-full"
            {...form.register('todo', { required: true })}
          />

          {user?.id === todoQuery.data.userId && (
            <Button
              aria-label="button-submit"
              className="btn btn-primary join-item normal-case disabled:btn-disabled"
              type="submit"
              isDisabled={fetcher.state === 'submitting'}
            >
              {t('update', { icon: '🖋' })}
            </Button>
          )}
        </form>
      )}
    </section>
  )
}