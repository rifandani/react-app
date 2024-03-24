import { useUserStore } from '#auth/hooks/use-user-store.hook';
import { Button } from '#shared/components/ui/button';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '#shared/components/ui/dialog';
import { Input } from '#shared/components/ui/input';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { TodoSchema } from '#todo/apis/todo.api';
import { todoKeys, todoSchema } from '#todo/apis/todo.api';
import { useTodoCreate } from '#todo/hooks/use-todo-create.hook';
import { useTodosParams } from '#todo/hooks/use-todos.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { random } from '@rifandani/nxact-yutiriti';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useBlocker } from 'react-router-dom';
import { toast } from 'sonner';

export function TodosCreate() {
  const [t] = useI18n();
  const { user } = useUserStore();
  const params = useTodosParams();
  const queryClient = useQueryClient();
  const todoCreateMutation = useTodoCreate();

  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      id: 1, // we override it later on `onSubmit`
      todo: '',
      userId: 1,
      completed: false,
    },
  });

  // block navigating when input has been entered, but not submitted
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      form.getValues().todo !== '' &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  return (
    <>
      <DialogTrigger isOpen={blocker.state === 'blocked'}>
        <DialogOverlay isDismissable={false}>
          <DialogContent
            role="alertdialog"
            closeButton={false}
            isDismissable={false}
          >
            <DialogHeader>
              <DialogTitle>{t('attention')}</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              {t('unsavedChanges')}
            </p>

            <DialogFooter>
              <Button
                variant="outline"
                className="mt-2 sm:mt-0"
                autoFocus
                onPress={blocker.reset}
              >
                Cancel
              </Button>
              <Button variant="destructive" onPress={blocker.proceed}>
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>

      <form
        className="mb-3 flex w-full flex-col duration-300 lg:flex-row"
        onSubmit={form.handleSubmit((values) => {
          const payload = {
            ...values,
            userId: user?.id ?? 1,
            id: random(11, 999_999), // generate different id everytime
          };

          todoCreateMutation.mutate(payload, {
            onSettled: (_newTodo, error, _variables, context) => {
              // reset form
              form.reset();

              toast[error ? 'error' : 'success'](
                t(error ? 'xCreateError' : 'xCreateSuccess', {
                  feature: 'Todo',
                }),
              );

              // If the mutation fails, use the context returned from `onMutate` to roll back
              if (error) {
                queryClient.setQueryData(
                  todoKeys.list(params),
                  context?.previousTodosQueryResponse,
                );
              }
            },
          });
        })}
      >
        <Input
          type="text"
          className="w-full lg:w-10/12"
          placeholder={t('todoPlaceholder')}
          {...form.register('todo', { required: true, minLength: 3 })}
        />

        <Button
          type="submit"
          className="ml-0 mt-2 w-full normal-case lg:ml-2 lg:mt-0 lg:w-2/12"
          isDisabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {t('add')}
        </Button>
      </form>
    </>
  );
}
