import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { ErrorResponseSchema } from '#shared/schemas/api.schema';
import type {
  TodoCreateRequestSchema,
  TodoCreateResponseSchema,
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

type Params = Parameters<typeof todoKeys.create>[0];
type Success = Awaited<ReturnType<typeof todoRepositories.create>>;
type Error = ErrorResponseSchema | HTTPError | ZodError;

/**
 * @url POST ${env.apiBaseUrl}/todos
 * @note includes error handling & `todoKeys.all` key invalidation for convenience
 */
export function useTodoCreate(
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
    mutationKey: todoKeys.create(params),
    mutationFn: (params) => todoRepositories.create(params),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });
      toast.success(t('xCreateSuccess', { feature: 'Todo' }));

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
 * get mutation state based on the mutation key.
 *
 * @url POST ${env.apiBaseUrl}/todos
 */
export function useTodoCreateState(params: Params) {
  return useMutationState<
    MutationState<Success, Error, Exclude<Params, undefined>>
  >({
    filters: {
      mutationKey: todoKeys.create(params),
    },
  });
}

/**
 * optimistic update
 *
 * @url POST ${env.apiBaseUrl}/todos
 * @note includes error handling in "effect" for convenience
 */
export function useTodoCreateOptimistic(
  params: Parameters<typeof todoKeys.list>[0],
  mutationOptions?: Except<
    UseMutationOptions<Success, Error, Exclude<Params, undefined>>,
    'mutationKey' | 'mutationFn' | 'onMutate'
  >,
) {
  const { onSettled, ..._mutationOptions } = mutationOptions ?? {};

  const [t] = useI18n();
  const queryClient = useQueryClient();
  const queryKey = todoKeys.list(params);

  return useMutation<
    TodoCreateResponseSchema,
    ErrorResponseSchema,
    TodoCreateRequestSchema,
    { previousTodosQueryResponse: TodoListResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (newTodo) => {
      const limit = Number(params?.limit ?? 10);

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousTodosQueryResponse =
        queryClient.getQueryData<TodoListResponseSchema>(queryKey) ?? {
          limit,
          todos: [],
          skip: 0,
          total: 0,
        };

      // Optimistically update to the new value & delete the last value
      queryClient.setQueryData<TodoListResponseSchema>(queryKey, {
        ...previousTodosQueryResponse,
        todos: [
          newTodo,
          ...previousTodosQueryResponse.todos.slice(0, limit - 1),
        ],
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
    mutationKey: todoKeys.create(undefined),
    mutationFn: (newTodo) => todoRepositories.create(newTodo),
    onSettled: (updateTodo, error, variables, context) => {
      toast[error ? 'error' : 'success'](
        t(error ? 'xCreateError' : 'xCreateSuccess', {
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

      onSettled?.(updateTodo, error, variables, context);
    },
    ..._mutationOptions,
  });
}
