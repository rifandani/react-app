import { queryClient } from '@app/providers/query/queryClient';
import { authPath } from '@auth/routes/auth.route';
import { checkAuthUser } from '@shared/utils/checker/checker.util';
import { todoApi, todoKeys } from '@todo/api/todo.api';
import { TodoDetailApiResponseSchema } from '@todo/api/todo.schema';
import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const todoLoader =
  (_queryClient: typeof queryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const authed = checkAuthUser();

    // redirect NOT authed user to login
    if (!authed) {
      toast.error('Unauthorized');
      return redirect(authPath.login);
    }

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
