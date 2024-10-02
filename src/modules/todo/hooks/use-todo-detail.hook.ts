import type { ErrorResponseSchema } from '#shared/schemas/api.schema';
import { todoKeys, todoRepositories } from '#todo/apis/todo.api';
import type { QueryOptions } from '@tanstack/react-query';
import { skipToken, useQuery } from '@tanstack/react-query';
import type { HTTPError } from 'ky';
import React from 'react';
import { toast } from 'sonner';
import type { Except } from 'type-fest';
import type { ZodError } from 'zod';

type Params = Parameters<typeof todoKeys.detail>[0];
type Response = Awaited<ReturnType<typeof todoRepositories.detail>>;
type Error = ErrorResponseSchema | HTTPError | ZodError;

/**
 * @url GET ${env.apiBaseUrl}/todos/${id}
 * @note includes error handling in "effect" for convenience
 */
export function useTodoDetail(
  id?: Params,
  options?: Except<QueryOptions<Response, Error>, 'queryKey' | 'queryFn'>,
) {
  const query = useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: id
      ? ({ signal }) => todoRepositories.detail(id, { signal })
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
