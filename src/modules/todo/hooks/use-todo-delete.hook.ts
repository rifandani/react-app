import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { ErrorResponseSchema } from '#shared/schemas/api.schema';
import type {
  TodoDeleteRequestSchema,
  TodoDeleteResponseSchema,
  TodoListResponseSchema,
} from '#todo/apis/todo.api';
import { todoKeys, todoRepositories } from '#todo/apis/todo.api';
import {
  useMutation,
  useMutationState,
  useQueryClient,
  type MutationState,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { toast } from 'sonner';
import type { Except } from 'type-fest';
import type { ZodError } from 'zod';

type Params = Parameters<typeof todoKeys.delete>[0];
type Success = Awaited<ReturnType<typeof todoRepositories.delete>>;
type Error = ErrorResponseSchema | HTTPError | ZodError;

/**
 * @url PUT ${env.apiBaseUrl}/todos
 * @note includes error handling & `todoKeys.all` key invalidation for convenience
 */
export function useTodoDelete(
  params: Params,
  mutationOptions?: Except<
    UseMutationOptions<Success, Error, Exclude<Params, undefined>>,
    'mutationKey' | 'mutationFn'
  >,
) {
  const { onSuccess, onError, ..._mutationOptions } = mutationOptions ?? {};
  const queryClient = useQueryClient();
  const [t] = useI18n();

  return useMutation<Success, Error, Exclude<Params, undefined>>({
    mutationKey: todoKeys.delete(params),
    mutationFn: (params) => todoRepositories.delete(params),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });
      toast.success(t('xDeleteSuccess', { feature: 'Todo' }));

      onSuccess?.(data, variables, context);
    },
    onError: async (error, variables, context) => {
      if (error instanceof HTTPError) {
        const json = (await error.response.json()) as ErrorResponseSchema;
        toast.error(json.message);
      } else {
        toast.error(error.message);
      }

      onError?.(error, variables, context);
    },
    ..._mutationOptions,
  });
}

/**
 * @url PUT ${env.apiBaseUrl}/todos
 */
export function useTodoDeleteState(params: Params) {
  return useMutationState<
    MutationState<Success, Error, Exclude<Params, undefined>>
  >({
    filters: {
      mutationKey: todoKeys.delete(params),
    },
  });
}

/**
 * @url DELETE ${env.apiBaseUrl}/todos/${id}
 * @note includes error handling in "effect" for convenience
 */
export function useTodoDeleteOptimistic(
  params: Parameters<typeof todoKeys.list>[0],
) {
  const [t] = useI18n();
  const queryClient = useQueryClient();
  const queryKey = todoKeys.list(params);

  return useMutation<
    TodoDeleteResponseSchema,
    ErrorResponseSchema,
    TodoDeleteRequestSchema,
    { previousTodosQueryResponse: TodoListResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic Delete)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousTodosQueryResponse =
        queryClient.getQueryData<TodoListResponseSchema>(queryKey) ?? {
          limit: Number(params?.limit ?? 10),
          todos: [],
          skip: 0,
          total: 0,
        };

      // Optimistically Delete to the new value
      queryClient.setQueryData<TodoListResponseSchema>(queryKey, {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos.filter(
          (_todo) => _todo.id !== id,
        ),
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
    mutationFn: (id) => todoRepositories.delete(id),
    onSettled: (_id, error, _variables, context) => {
      toast[error ? 'error' : 'success'](
        t(error ? 'xDeleteError' : 'xDeleteSuccess', {
          feature: 'Todo',
        }),
      );

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error)
        queryClient.setQueryData<TodoListResponseSchema>(
          queryKey,
          context?.previousTodosQueryResponse,
        );

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey });
    },
  });
}
