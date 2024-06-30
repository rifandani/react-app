import type { queryClient } from '#app/providers/query/client';
import { useAuthUserStore } from '#auth/hooks/use-auth-user-store.hook';
import { authPath } from '#auth/routes';
import { Button } from '#shared/components/ui/button';
import { Checkbox } from '#shared/components/ui/checkbox';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '#shared/components/ui/dialog';
import { Input } from '#shared/components/ui/input';
import { Label } from '#shared/components/ui/label';
import { Link } from '#shared/components/ui/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '#shared/components/ui/select';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { resourceListRequestSchema } from '#shared/schemas/api.schema';
import { checkAuthUser } from '#shared/utils/checker.util';
import type { TodoListResponseSchema, TodoSchema } from '#todo/apis/todo.api';
import { todoKeys, todoRepositories, todoSchema } from '#todo/apis/todo.api';
import { todosDefaults } from '#todo/constants/todos.constant';
import { useTodoCreateOptimistic } from '#todo/hooks/use-todo-create.hook';
import { useTodoDeleteOptimistic } from '#todo/hooks/use-todo-delete.hook';
import { useTodoList } from '#todo/hooks/use-todo-list.hook';
import { useTodoUpdateOptimistic } from '#todo/hooks/use-todo-update.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { random } from '@rifandani/nxact-yutiriti';
import { GridList, GridListItem } from 'react-aria-components';
import { useForm } from 'react-hook-form';
import {
  redirect,
  useBlocker,
  useHref,
  useLoaderData,
  useSearchParams,
  type LoaderFunctionArgs,
} from 'react-router-dom';
import { toast } from 'sonner';
import { twJoin } from 'tailwind-merge';
import { match } from 'ts-pattern';
import { z } from 'zod';

/**
 * to avoid showing an error to the user because we use `catch` if a search parameter is malformed
 */
const searchParamsSchema = resourceListRequestSchema
  .pick({ select: true })
  .extend({
    limit: z
      .string()
      .optional()
      .default(todosDefaults.limit.toString())
      .catch(todosDefaults.limit.toString())
      .transform((value) => Number(value)),
    skip: z
      .string()
      .optional()
      .default(todosDefaults.skip.toString())
      .catch(todosDefaults.skip.toString())
      .transform((value) => Number(value)),
  });

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
    const parsedSearchParams = searchParamsSchema.parse(searchParams);

    const todos = await _queryClient.ensureQueryData({
      queryKey: todoKeys.list(parsedSearchParams),
      queryFn: () => todoRepositories.list(parsedSearchParams),
      staleTime: 1_000 * 60 * 1, // 1 min
    });

    return todos;
  };
}

export function Element() {
  const [t] = useI18n();

  return (
    <div className="container mx-auto flex flex-col py-5 duration-300">
      <h1 className="text-3xl font-medium sm:text-4xl">
        {t('xList', { feature: 'Todo' })}
      </h1>

      <section className="w-full pt-5">
        <TodosCreate />
        <TodosFilter />
        <TodosList />
      </section>
    </div>
  );
}

function TodosCreate() {
  const [t] = useI18n();
  const { user } = useAuthUserStore();
  const [searchParams] = useSearchParams();
  const parsedSearchParams = searchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const todoCreateOptimistic = useTodoCreateOptimistic(parsedSearchParams, {
    onSettled: () => {
      // reset form
      form.reset();
    },
  });

  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      id: 1, // we override it later on `onSubmit`
      todo: '',
      userId: 1,
      completed: false,
    },
  });

  // block navigating when input has been entered, but not submitted
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      form.watch('todo') !== '' &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  return (
    <>
      <DialogTrigger isOpen={blocker.state === 'blocked'}>
        <DialogOverlay isDismissable={false}>
          <DialogContent
            role="alertdialog"
            closeButton={false}
            isDismissable={false}
          >
            <DialogHeader>
              <DialogTitle>{t('attention')}</DialogTitle>
            </DialogHeader>

            <p className="text-sm text-muted-foreground">
              {t('unsavedChanges')}
            </p>

            <DialogFooter>
              <Button
                variant="outline"
                className="mt-2 sm:mt-0"
                autoFocus
                onPress={blocker.reset}
              >
                Cancel
              </Button>
              <Button variant="destructive" onPress={blocker.proceed}>
                Continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>

      <form
        className="mb-3 flex w-full flex-col duration-300 lg:flex-row"
        onSubmit={form.handleSubmit((values) => {
          const payload = {
            ...values,
            userId: user?.id ?? 1,
            id: random(11, 999_999), // generate different id everytime
          };

          todoCreateOptimistic.mutate(payload);
        })}
      >
        <Input
          type="text"
          className="w-full lg:w-10/12"
          placeholder={t('todoPlaceholder')}
          {...form.register('todo', { required: true, minLength: 3 })}
        />

        <Button
          type="submit"
          className="ml-0 mt-2 w-full normal-case lg:ml-2 lg:mt-0 lg:w-2/12"
          isDisabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {t('add')}
        </Button>
      </form>
    </>
  );
}

function TodosFilter() {
  const [t] = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedSearchParams = searchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const items = todosDefaults.limits.map((limit) => ({ id: limit }));

  return (
    <form className="pb-3 w-full">
      <Select
        aria-label="todo list limit selection"
        selectedKey={parsedSearchParams.limit.toString()}
        onSelectionChange={(selected) => {
          // set to url params
          searchParams.set('limit', selected as string);
          setSearchParams(searchParams);
        }}
      >
        <Label>{t('limit')}</Label>

        <SelectTrigger className="w-[160px]">
          <SelectValue>{({ selectedText }) => selectedText}</SelectValue>
        </SelectTrigger>

        <SelectPopover>
          <SelectContent aria-label="limits" items={items}>
            {({ id }) => <SelectItem textValue={id}>{id}</SelectItem>}
          </SelectContent>
        </SelectPopover>
      </Select>
    </form>
  );
}

function TodosList() {
  const [t] = useI18n();
  const initialData = useLoaderData() as TodoListResponseSchema;
  const [searchParams] = useSearchParams();
  const parsedSearchParams = searchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const todoListQuery = useTodoList(parsedSearchParams, { initialData });

  return (
    <>
      {match(todoListQuery)
        .with({ isFetching: true }, { isLoading: true }, () => (
          <div
            aria-label="Todo list query loading spinner"
            className="flex items-center justify-center py-5"
          >
            <Icon
              icon="svg-spinners:3-dots-fade"
              height="5em"
              className="text-primary"
            />
          </div>
        ))
        .with({ isError: true }, ({ error }) => (
          <div
            role="alert"
            aria-label="Todo list query error"
            className="mt-2 bg-destructive p-2 rounded-md flex items-center gap-x-3 shadow-md w-full"
          >
            <Icon icon="lucide:alert-circle" />

            <span className="flex flex-col">
              <p className="">{t('error', { module: 'Todos' })}:</p>
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </span>
          </div>
        ))
        .with({ isSuccess: true }, ({ data }) => (
          <GridList
            aria-label="Todo grid list with multiple checkbox selection and toggle behavior"
            selectionMode="multiple"
            selectionBehavior="toggle"
            items={data.todos}
            renderEmptyState={() => (
              <h2 className="flex items-center justify-center py-5">
                {t('empty')}
              </h2>
            )}
          >
            {(todo) => <TodosListItem todo={todo} />}
          </GridList>
        ))
        .otherwise(() => null)}
    </>
  );
}

function TodosListItem({ todo }: { todo: TodoSchema }) {
  const { user } = useAuthUserStore();
  const href = useHref(todo.id.toString(), { relative: 'path' });
  const [searchParams] = useSearchParams();
  const parsedSearchParams = searchParamsSchema.parse(
    Object.fromEntries(searchParams),
  );

  const todoUpdateOptimistic = useTodoUpdateOptimistic(parsedSearchParams);
  const todoDeleteOptimistic = useTodoDeleteOptimistic(parsedSearchParams);

  return (
    <GridListItem
      className="mb-2 flex items-center justify-between duration-300 ease-in-out animate-in slide-in-from-left-5"
      textValue={todo.todo}
    >
      <Checkbox
        slot="selection"
        id={`todo-${todo.id}-checkbox`}
        name={`todo-${todo.id}-checkbox`}
        isSelected={todo.completed}
        onChange={() => {
          todoUpdateOptimistic.mutate({ ...todo, completed: !todo.completed });
        }}
      />

      <Link
        href={href}
        className={twJoin(
          'w-full justify-start text-lg text-current hover:font-bold',
          todo.completed && 'line-through hover:line-through',
        )}
        variant="link"
      >
        {todo.todo}
      </Link>

      {user?.id === todo.userId && (
        <Button
          data-testid="todo-delete"
          type="submit"
          size="xs"
          variant="destructive"
          onPress={() => {
            todoDeleteOptimistic.mutate(todo.id);
          }}
        >
          <Icon icon="lucide:trash-2" />
        </Button>
      )}
    </GridListItem>
  );
}
