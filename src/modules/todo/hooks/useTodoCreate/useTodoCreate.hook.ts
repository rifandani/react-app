import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import {
  CreateTodoApiResponseSchema,
  CreateTodoSchema,
  TodoListApiResponseSchema,
} from '@todo/api/todo.schema';
import { useTodosParams } from '@todo/hooks/useTodos/useTodos.hook';

/**
 * create todo mutation (optimistic update) based on `useTodosParams`
 */
export const useTodoCreate = () => {
  const params = useTodosParams();
  const queryClient = useQueryClient();

  return useMutation<
    CreateTodoApiResponseSchema,
    ErrorApiResponseSchema,
    CreateTodoSchema,
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (newTodo) => {
      const limit = Number(params.limit);
      const emptyResponse: TodoListApiResponseSchema = {
        limit,
        todos: [],
        skip: 0,
        total: 0,
      };
      const queryKey = todoKeys.list(params);

      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousTodosQueryResponse =
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/non-nullable-type-assertion-style
        (queryClient.getQueryData(queryKey) as TodoListApiResponseSchema) ??
        emptyResponse;

      // Optimistically update to the new value & delete the last value
      queryClient.setQueryData(queryKey, {
        ...previousTodosQueryResponse,
        todos: [
          newTodo,
          ...previousTodosQueryResponse.todos.slice(0, limit - 1),
        ],
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
    mutationFn: (newTodo) => todoApi.create(newTodo),
  });
};
