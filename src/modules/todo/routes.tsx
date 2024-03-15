import { queryClient } from '#app/providers/query/client';
import { PageWrapper } from '#shared/components/page-wrapper';
import { RouteErrorBoundary } from '#shared/components/route-error-boundary';
import type { RouteObject } from 'react-router-dom';

export const todosId = {
  root: 'todos',
  index: 'todos:index',
  detail: 'todos:detail',
} as const;

export const todosPath = {
  root: '/todos',
  index: '',
  detail: ':id',
} as const;

const todosDetailRoute = {
  id: todosId.detail,
  path: todosPath.detail,
  lazy: async () => {
    const todo = await import('./pages/todo.page');

    return {
      action: todo.action(queryClient),
      loader: todo.loader(queryClient),
      element: <todo.Element />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} satisfies RouteObject;

const todosIndexRoute = {
  id: todosId.index,
  index: true,
  lazy: async () => {
    const todos = await import('./pages/todos.page');

    return {
      loader: todos.loader(queryClient),
      element: <todos.Element />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} satisfies RouteObject;

export const todosRoute = {
  id: todosId.root,
  path: todosPath.root,
  element: <PageWrapper />,
  children: [todosIndexRoute, todosDetailRoute],
} satisfies RouteObject;
