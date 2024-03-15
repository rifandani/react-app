import type { queryClient } from '#app/providers/query/client';
import { authPath } from '#auth/routes';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import type { ResourceParamsSchema } from '#shared/schemas/api.schema';
import { checkAuthUser } from '#shared/utils/checker.util';
import {
  todoApi,
  todoKeys,
  type TodoListApiResponseSchema,
} from '#todo/apis/todo.api';
import { TodosCreate } from '#todo/components/todos-create';
import { TodosFilter } from '#todo/components/todos-filter';
import { TodosList } from '#todo/components/todos-list';
import { defaultLimit } from '#todo/constants/todos.constant';
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { SetRequired } from 'type-fest';

export function loader(_queryClient: typeof queryClient) {
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

export function Element() {
  const [t] = useI18n();

  return (
    <div className="flex flex-col items-center justify-center px-10 py-20 duration-300 md:px-24 lg:px-40 xl:px-52">
      <h1 className="mb-10 text-2xl font-semibold tracking-wider">
        {t('xList', { feature: 'Todo' })}
      </h1>

      <section className="card w-full bg-base-200 p-5 shadow-lg">
        <TodosCreate />
        <TodosFilter />
        <TodosList />
      </section>
    </div>
  );
}
