import type { queryClient } from '#app/providers/query/client';
import { authPath } from '#auth/routes';
import { useI18n } from '#shared/hooks/use-i18n/use-i18n.hook';
import { resourceParamsSchema } from '#shared/schemas/api.schema';
import { checkAuthUser } from '#shared/utils/checker.util';
import { todoApi, todoKeys } from '#todo/apis/todo.api';
import { TodosCreate } from '#todo/components/todos-create';
import { TodosFilter } from '#todo/components/todos-filter';
import { TodosList } from '#todo/components/todos-list';
import { defaultLimit } from '#todo/constants/todos.constant';
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const searchParamsSchema = resourceParamsSchema.pick({ select: true }).extend({
  limit: z
    .string()
    .optional()
    .transform((val, ctx) => {
      if (val === undefined) return val;

      const numberVal = Number(val);
      if (Number.isNaN(numberVal)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Limit is not a number',
        });

        // This is a special symbol you can use to return early from the transform function.
        // It has type `never` so it does not affect the inferred return type.
        return z.NEVER;
      }

      return numberVal;
    })
    .default(defaultLimit),
  skip: z
    .string()
    .optional()
    .transform((val, ctx) => {
      if (val === undefined) return val;

      const numberVal = Number(val);
      if (Number.isNaN(numberVal)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Limit is not a number',
        });

        return z.NEVER;
      }

      return numberVal;
    }),
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
    const searchParams = searchParamsSchema.parse(
      Object.fromEntries(url.searchParams),
    );
    const queryKey = todoKeys.list(searchParams);
    const queryFn = () => todoApi.list(searchParams);
    const staleTime = 1_000 * 60 * 1; // 1 min

    const todos = await _queryClient.ensureQueryData({
      queryKey,
      queryFn,
      staleTime,
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
