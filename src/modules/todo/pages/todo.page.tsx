import type { queryClient } from '#app/providers/query/client';
import { useUserStore } from '#auth/hooks/use-user-store.hook';
import { authPath } from '#auth/routes';
import { homeRoute } from '#home/routes';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '#shared/components/ui/breadcrumbs';
import { Button } from '#shared/components/ui/button';
import { Input } from '#shared/components/ui/input';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { checkAuthUser } from '#shared/utils/checker.util';
import type {
  TodoDetailApiResponseSchema,
  UpdateTodoSchema,
} from '#todo/apis/todo.api';
import { todoApi, todoKeys, updateTodoSchema } from '#todo/apis/todo.api';
import { useTodo } from '#todo/hooks/use-todo.hook';
import { todosPath, todosRoute } from '#todo/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  redirect,
  useFetcher,
  useLoaderData,
  useParams,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import { toast } from 'sonner';
import { match } from 'ts-pattern';

export function action(_queryClient: typeof queryClient) {
  return async ({ request, params }: ActionFunctionArgs) => {
    if (request.method === 'PUT') {
      const queryKeyLists = todoKeys.lists();
      const queryKeyDetail = todoKeys.detail(Number(params.id));
      const payload = (await request.json()) as UpdateTodoSchema;
      await todoApi.update(payload);

      // remove the todos cache
      _queryClient.removeQueries({ queryKey: queryKeyLists });
      _queryClient.removeQueries({ queryKey: queryKeyDetail });
      // invalidate only change the status to inactive, the cache is still there
      // await _queryClient.invalidateQueries({ queryKey: queryKeyLists }); // `await` is the "lever"

      // NOTE: we can't translate this
      toast.success('Todo successfully updated');
      return redirect(todosPath.root);
    }

    toast.warning('Not Implemented');
    return new Response('Not Implemented', { status: 501 });
  };
}

export function loader(_queryClient: typeof queryClient) {
  return async ({ params }: LoaderFunctionArgs) => {
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
}

export function Element() {
  const [t] = useI18n();
  const { id } = useParams();
  const fetcher = useFetcher();
  const { user } = useUserStore();
  const initialData = useLoaderData() as TodoDetailApiResponseSchema;
  const todoQuery = useTodo(Number(id), { initialData });

  const form = useForm<UpdateTodoSchema>({
    resolver: zodResolver(updateTodoSchema),
    defaultValues: {
      id: initialData.id,
      completed: initialData.completed,
      todo: initialData.todo,
    },
  });

  return (
    <div className="container mx-auto flex flex-col items-center py-5 duration-300">
      <section className="mb-10 flex w-full flex-col space-y-2">
        <Breadcrumbs>
          <BreadcrumbItem>
            <BreadcrumbLink href={homeRoute.path}>Home</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={todosRoute.path}>Todos</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>{id}</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumbs>

        <h1 className="text-3xl font-medium sm:text-4xl">
          {t('xDetail', { feature: 'Todo' })}
        </h1>
      </section>

      <form
        className="w-full flex items-center gap-x-2"
        onSubmit={form.handleSubmit((values) => {
          // prohibit unauthorized user submit (e.g. when clicking Enter in input)
          if (todoQuery.data && todoQuery.data.userId !== user?.id) return;

          fetcher.submit(values, {
            method: 'PUT',
            encType: 'application/json',
          });
        })}
      >
        {match(todoQuery)
          .with({ isError: true }, () => (
            <div
              role="alert"
              aria-label="Todo detail query error"
              className="alert alert-error mt-2 shadow-lg"
            >
              <div className="flex items-center">
                <span>{t('error', { module: 'Todos' })}:</span>
                <pre>{JSON.stringify(todoQuery.error, null, 2)}</pre>
              </div>
            </div>
          ))
          .with({ isSuccess: true }, ({ data }) => (
            <>
              <Input
                type="text"
                className="w-10/12"
                aria-label="todo detail input"
                {...form.register('todo', { required: true })}
              />

              {user?.id === data.userId && (
                <Button
                  type="submit"
                  className="w-2/12"
                  isDisabled={fetcher.state === 'submitting'}
                >
                  {t('update')}
                </Button>
              )}
            </>
          ))
          .otherwise(() => null)}
      </form>
    </div>
  );
}
