import type { QueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { Except } from 'type-fest';
import type { ErrorApiResponseSchema } from '#shared/schemas/api.schema';
import { todoApi, todoKeys } from '#todo/apis/todo.api';
import type {
  TodoDetailApiResponseSchema,
  TodoSchema,
} from '#todo/apis/todo.api';

/**
 * fetch todo detail
 *
 * @param id - todo id
 */
export function useTodo(
  id: TodoSchema['id'],
  options?: Except<
    QueryOptions<TodoDetailApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) {
  const queryKey = todoKeys.detail(id);
  const queryFn = () => todoApi.detail(id);

  return useQuery({
    ...options,
    queryKey,
    queryFn,
  });
}
