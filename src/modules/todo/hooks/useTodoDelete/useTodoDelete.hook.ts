import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import useI18n from '@shared/hooks/useI18n/useI18n.hook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import {
  DeleteTodoApiResponseSchema,
  DeleteTodoSchema,
  TodoListApiResponseSchema,
} from '@todo/api/todo.schema';
import { useTodosParams } from '@todo/hooks/useTodos/useTodos.hook';
import { toast } from 'react-toastify';

/**
 * delete todo mutation based on `useTodosParams` and show toast
 */
export const useTodoDelete = () => {
  const queryClient = useQueryClient();
  const params = useTodosParams();
  const [t] = useI18n();
  const queryKey = todoKeys.list(params);

  return useMutation<
    DeleteTodoApiResponseSchema,
    ErrorApiResponseSchema,
    DeleteTodoSchema['id'],
    { previousTodosQueryResponse: TodoListApiResponseSchema }
  >({
    // Called before `mutationFn`:
    onMutate: async (id) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousTodosQueryResponse = (queryClient.getQueryData(queryKey) ??
        []) as TodoListApiResponseSchema;

      // Optimistically update to the new value
      queryClient.setQueryData(queryKey, {
        ...previousTodosQueryResponse,
        todos: previousTodosQueryResponse.todos.filter(
          (_todo) => _todo.id !== id,
        ),
      });

      // Return a context object with the snapshotted value
      return { previousTodosQueryResponse };
    },
    mutationFn: (id) => todoApi.delete(id),
    onSettled: (_id, error, _variables, context) => {
      toast[error ? 'error' : 'success'](
        t(error ? 'xDeleteError' : 'xDeleteSuccess', {
          feature: 'Todo',
        }),
      );

      // If the mutation fails, use the context returned from `onMutate` to roll back
      if (error)
        queryClient.setQueryData(queryKey, context?.previousTodosQueryResponse);

      // if we want to refetch after error or success:
      // await queryClient.invalidateQueries({ queryKey });
    },
  });
};
