import { useAuthUserStore } from '#/auth/hooks/use-auth-user-store.hook';
import { authPath } from '#/auth/routes';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '#/core/components/ui/breadcrumbs';
import { Button } from '#/core/components/ui/button';
import { Input } from '#/core/components/ui/input';
import { useI18n } from '#/core/hooks/use-i18n/use-i18n.hook';
import type { queryClient } from '#/core/providers/query/client';
import { checkAuthUser } from '#/core/utils/checker.util';
import { homeRoute } from '#/home/routes';
import type {
  TodoDetailResponseSchema,
  TodoUpdateRequestSchema,
} from '#/todo/apis/todo.api';
import {
  todoKeys,
  todoRepositories,
  todoUpdateRequestSchema,
} from '#/todo/apis/todo.api';
import { useTodoDetail } from '#/todo/hooks/use-todo-detail.hook';
import { todosPath, todosRoute } from '#/todo/routes';
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
import { z } from 'zod';

const paramsSchema = z.object({
  id: z.string().transform((value) => Number(value)),
});

export const action = (_queryClient: typeof queryClient) => {
  return async ({ request }: ActionFunctionArgs) => {
    if (request.method === 'PUT') {
      const payload = (await request.json()) as TodoUpdateRequestSchema;
      await todoRepositories.update(payload);

      // invalidate only change the status to inactive, the cache is still there
      // `await` is the lever
      await _queryClient.invalidateQueries({
        queryKey: todoKeys.all,
      });

      toast.success('Todo successfully updated');
      return redirect(todosPath.root);
    }

    toast.warning('Not Implemented');
    return new Response('Not Implemented', { status: 501 });
  };
};

export const loader = (_queryClient: typeof queryClient) => {
  return async ({ params }: LoaderFunctionArgs) => {
    const authed = checkAuthUser();

    // redirect NOT authed user to login
    if (!authed) {
      toast.error('Unauthorized');
      return redirect(authPath.login);
    }

    const parsedParams = paramsSchema.parse(params);
    const todoDetail = await _queryClient.ensureQueryData({
      queryKey: todoKeys.detail(parsedParams.id),
      queryFn: () => todoRepositories.detail(parsedParams.id),
      staleTime: 1_000 * 60 * 1, // 1 min
    });

    return todoDetail;
  };
};

export function Element() {
  const [t] = useI18n();
  const fetcher = useFetcher();
  const { user } = useAuthUserStore();
  const initialData = useLoaderData() as TodoDetailResponseSchema;
  const params = useParams();
  const parsedParams = paramsSchema.parse(params);

  // already populated in loader
  const todoDetailQuery = useTodoDetail(parsedParams.id, { initialData });

  const form = useForm<TodoUpdateRequestSchema>({
    resolver: zodResolver(todoUpdateRequestSchema),
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
            <BreadcrumbPage>{parsedParams.id}</BreadcrumbPage>
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
          if (todoDetailQuery.data?.userId !== user?.id) return;

          fetcher.submit(values, {
            method: 'PUT',
            encType: 'application/json',
          });
        })}
      >
        {match(todoDetailQuery)
          .with({ isError: true }, () => (
            <div
              aria-label="Todo detail query error"
              className="alert alert-error mt-2 shadow-lg"
            >
              <div className="flex items-center">
                <span>{t('error', { module: 'Todos' })}:</span>
                <pre>{JSON.stringify(todoDetailQuery.error, null, 2)}</pre>
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
