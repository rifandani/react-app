import type { ErrorResponseSchema } from '#shared/schemas/api.schema';
import { todoKeys, todoRepositories } from '#todo/apis/todo.api';
import type { QueryOptions } from '@tanstack/react-query';
import { skipToken, useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';
import type { Except } from 'type-fest';

type Params = Parameters<typeof todoKeys.detail>[0];
type Response = Awaited<ReturnType<typeof todoRepositories.detail>>;

/**
 * @url GET ${env.apiBaseUrl}/todos/${id}
 * @note includes error handling in "effect" for convenience
 */
export function useTodoDetail(
  id?: Params,
  options?: Except<
    QueryOptions<Response, ErrorResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) {
  const queryKey = todoKeys.detail(id);
  const queryFn = id ? () => todoRepositories.detail(id) : skipToken;

  const query = useQuery({
    queryKey,
    queryFn,
    ...(options && options),
  });

  React.useEffect(() => {
    if (query.error) {
      toast.error(query.error.message);
    }
  }, [query.error]);

  return query;
}
