import { ErrorApiResponseSchema } from '@shared/schemas/api.schema';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { todoApi, todoKeys } from '@todo/apis/todo.api';
import {
  TodoDetailApiResponseSchema,
  TodoSchema,
} from '@todo/schemas/todo.schema';
import { Except } from 'type-fest';

/**
 * fetch todo detail
 *
 * @param id - todo id
 */
export const useTodo = (
  id: TodoSchema['id'],
  options?: Except<
    QueryOptions<TodoDetailApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) => {
  const queryKey = todoKeys.detail(id);
  const queryFn = () => todoApi.detail(id);

  return useQuery({
    ...options,
    queryKey,
    queryFn,
  });
};
