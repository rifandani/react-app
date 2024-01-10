import { zodResolver } from '@hookform/resolvers/zod'
import { random } from '@rifandani/nxact-yutiriti'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useId } from 'react'
import { Button } from 'react-aria-components'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useBeforeUnload } from 'react-router-dom'
import { toast } from 'react-toastify'
import { todoSchema } from '#todo/schemas/todo.schema'
import type { TodoSchema } from '#todo/schemas/todo.schema'
import { useTodosParams } from '#todo/hooks/use-todos.hook'
import { useTodoCreate } from '#todo/hooks/use-todo-create.hook'
import { todoKeys } from '#todo/apis/todo.api'
import { useI18n } from '#shared/hooks/use-i18n.hook'
import { Modal as DaisyModal } from '#shared/components/modal/modal'
import { useUserStore } from '#auth/hooks/use-user-store.hook'

export function TodosCreate() {
  const queryClient = useQueryClient()
  const [t] = useI18n()
  const { user } = useUserStore()
  const params = useTodosParams()
  const todoCreateMutation = useTodoCreate()
  const modalId = useId()

  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      id: 1, // we override it later on `onSubmit`
      todo: '',
      userId: 1,
      completed: false,
    },
  })

  // #region HANDLERS
  const onSubmit: SubmitHandler<TodoSchema> = (data) => {
    const payload = {
      ...data,
      userId: user?.id ?? 1,
      id: random(11, 999_999), // generate different id everytime
    }

    todoCreateMutation.mutate(payload, {
      onSettled: (_newTodo, error, _variables, context) => {
        // reset form
        form.reset()

        toast[error ? 'error' : 'success'](
          t(error ? 'xCreateError' : 'xCreateSuccess', {
            feature: 'Todo',
          }),
        )

        // If the mutation fails, use the context returned from `onMutate` to roll back
        if (error) {
          queryClient.setQueryData(
            todoKeys.list(params),
            context?.previousTodosQueryResponse,
          )
        }
      },
    })
  }
  // #endregion

  useBeforeUnload(
    useCallback(
      (evt) => {
        if (!evt.defaultPrevented && !!form.getValues().todo) {
          // preventDefault to block immediately and prompt user async
          evt.preventDefault()

          evt.returnValue = ''

          // @ts-expect-error daisyUI modal method utilizing `dialog` element with `id`
          const modal = window[modalId] as HTMLDialogElement
          modal.showModal()
        }
      },
      [form, modalId],
    ),
  )

  return (
    <>
      <DaisyModal id={modalId}>
        <h1 className="text-lg font-bold">Unsaved Changes</h1>
        <p className="pt-4">{t('unsavedChanges')}</p>
      </DaisyModal>

      <form
        aria-label="form-add"
        className="form-control mb-3 w-full duration-300 lg:flex-row"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <input
          id="todo"
          type="text"
          aria-label="textbox-add"
          className="input input-bordered input-primary w-full lg:w-10/12"
          placeholder={t('todoPlaceholder')}
          {...form.register('todo', { required: true, minLength: 3 })}
        />

        <Button
          aria-label="button-add"
          className="btn btn-primary ml-0 mt-2 w-full normal-case text-primary-content disabled:btn-disabled lg:ml-2 lg:mt-0 lg:w-2/12"
          type="submit"
          isDisabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {t('add', { icon: '💾' })}
        </Button>
      </form>
    </>
  )
}
