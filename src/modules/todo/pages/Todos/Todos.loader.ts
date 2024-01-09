import { queryClient } from '@app/providers/query/client';
import { authPath } from '@auth/routes/auth.route';
import { ResourceParamsSchema } from '@shared/schemas/api.schema';
import { checkAuthUser } from '@shared/utils/checker.util';
import { todoApi, todoKeys } from '@todo/apis/todo.api';
import { defaultLimit } from '@todo/constants/todos.constant';
import { TodoListApiResponseSchema } from '@todo/schemas/todo.schema';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SetRequired } from 'type-fest';

export const todosLoader =
  (_queryClient: typeof queryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const authed = checkAuthUser();

    // redirect NOT authed user to login
    if (!authed) {
      toast.error('Unauthorized');
      return redirect(authPath.login);
    }

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
