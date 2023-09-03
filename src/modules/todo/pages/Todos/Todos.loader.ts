import { queryClient } from '@app/providers/query/queryClient';
import { ResourceParamsSchema } from '@shared/api/api.schema';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoListApiResponseSchema } from '@todo/api/todo.schema';
import { defaultLimit } from '@todo/constants/todos.constant';
import { LoaderFunctionArgs } from 'react-router-dom';
import { SetRequired } from 'type-fest';

export const todosLoader =
  (_queryClient: typeof queryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const limit = Number(searchParams?.limit ?? defaultLimit);
    const params: SetRequired<ResourceParamsSchema, 'limit'> = {
      ...searchParams,
      limit,
    };
    const queryKey = todoKeys.list(params);
    const queryFn = () => todoApi.list(params);
    const staleTime = 1_000 * 60 * 1; // 1 min

    // or we can use `_queryClient.ensureQueryData`
    const todosCache =
      _queryClient.getQueryData<TodoListApiResponseSchema>(queryKey);
    const todosData = await _queryClient.fetchQuery({
      queryKey,
      queryFn,
      staleTime,
    });

    return todosCache ?? todosData;
  };
