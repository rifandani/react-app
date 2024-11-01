import type {
  ErrorResponseSchema,
  ResourceListRequestSchema,
} from '#/core/schemas/api.schema';
import {
  todoKeys,
  todoRepositories,
  type TodoListResponseSchema,
} from '#/todo/apis/todo.api';
import { todosDefaults } from '#/todo/constants/todos.constant';
import type {
  DefinedInitialDataOptions,
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { skipToken, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import React from 'react';
import { toast } from 'sonner';
import type { Except } from 'type-fest';
import type { ZodError } from 'zod';

type Params = Parameters<typeof todoKeys.list>[0];
type Response = Awaited<ReturnType<typeof todoRepositories.list>>;
type Error = ErrorResponseSchema | HTTPError | ZodError;

/**
 * @url GET ${env.apiBaseUrl}/todos
 * @note includes error handling in "effect" for convenience
 */
export function useTodoList(
  params?: Params,
  options?: Except<
    DefinedInitialDataOptions<Response, Error>,
    'queryKey' | 'queryFn'
  >,
) {
  const query = useQuery({
    queryKey: todoKeys.list(params),
    queryFn: params
      ? ({ signal }) => todoRepositories.list(params, { signal })
      : skipToken,
    ...(options && options),
  });

  React.useEffect(() => {
    if (query.error) {
      toast.error(query.error.message);
    }
  }, [query.error]);

  return query;
}

/**
 * @url GET ${env.apiBaseUrl}/todos
 * @note includes error handling in "effect" for convenience
 */
export function useTodoListInfinite(
  params?: Except<ResourceListRequestSchema, 'skip'> | undefined,
  options?: Except<
    UseInfiniteQueryOptions<
      TodoListResponseSchema,
      Error,
      InfiniteData<TodoListResponseSchema>,
      TodoListResponseSchema,
      QueryKey,
      number
    >,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >,
) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: todoKeys.list(params),
    queryFn: params
      ? ({ pageParam, signal }) =>
          todoRepositories.list(
            {
              ...params,
              skip: (params?.limit ?? todosDefaults.skip) + pageParam,
            },
            { signal },
          )
      : skipToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.total > lastPageParam ? undefined : lastPageParam + 10, // increment skip by 10
    ...(options && options),
  });

  React.useEffect(() => {
    if (infiniteQuery.error) {
      toast.error(infiniteQuery.error.message);
    }
  }, [infiniteQuery.error]);

  return infiniteQuery;
}
