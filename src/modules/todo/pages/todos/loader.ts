import type { LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { SetRequired } from 'type-fest';
import type { queryClient } from '#app/providers/query/client';
import type { ResourceParamsSchema } from '#shared/schemas/api.schema';
import { checkAuthUser } from '#shared/utils/checker.util';
import { todoApi, todoKeys } from '#todo/apis/todo.api';
import { defaultLimit } from '#todo/constants/todos.constant';
import type { TodoListApiResponseSchema } from '#todo/apis/todo.api';
import { authPath } from '#auth/routes';

export function todosLoader(_queryClient: typeof queryClient) {
  return async ({ request }: LoaderFunctionArgs) => {
    const authed = checkAuthUser();

    // redirect NOT authed user to login
    if (!authed) {
      toast.error('Unauthorized');
      return redirect(authPath.login);
    }

    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams);
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
}
