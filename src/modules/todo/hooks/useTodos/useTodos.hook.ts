import {
  ErrorApiResponseSchema,
  ResourceParamsSchema,
} from '@shared/api/api.schema';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoListApiResponseSchema } from '@todo/api/todo.schema';
import { defaultLimit } from '@todo/constants/todos.constant';
import { useSearchParams } from 'react-router-dom';
import { Except, SetRequired } from 'type-fest';

/**
 * todos search params in object
 */
export const useTodosParams = () => {
  const [searchParams] = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const limit = Number(searchParamsObj?.limit ?? defaultLimit);
  const params: SetRequired<ResourceParamsSchema, 'limit'> = {
    ...searchParamsObj,
    limit,
  };

  return params;
};

/**
 * fetch todos based on search params
 */
export const useTodos = (
  options?: Except<
    QueryOptions<TodoListApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) => {
  const params = useTodosParams();
  const queryKey = todoKeys.list(params);
  const queryFn = () => todoApi.list(params);

  return useQuery({
    ...options,
    queryKey,
    queryFn,
  });
};
