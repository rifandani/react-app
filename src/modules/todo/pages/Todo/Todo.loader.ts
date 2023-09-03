import { queryClient } from '@app/providers/query/queryClient';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoDetailApiResponseSchema } from '@todo/api/todo.schema';
import { LoaderFunctionArgs } from 'react-router-dom';

export const todoLoader =
  (_queryClient: typeof queryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const queryKey = todoKeys.detail(Number(params.id));
    const queryFn = () => todoApi.detail(Number(params.id));
    const staleTime = 1_000 * 60 * 1; // 1 min

    // or we can use `_queryClient.ensureQueryData`
    const todoDetailCache =
      _queryClient.getQueryData<TodoDetailApiResponseSchema>(queryKey);
    const todoDetailData = await _queryClient.fetchQuery({
      queryKey,
      queryFn,
      staleTime,
    });

    return todoDetailCache ?? todoDetailData;
  };
