import { queryClient } from '@app/providers/query/queryClient';
import { NavbarWrapper } from '@shared/components/templates';
import RouteErrorBoundary from '@shared/components/templates/RouteErrorBoundary/RouteErrorBoundary.template';
import { todoAction } from '@todo/pages/Todo/Todo.action';
import { todoLoader } from '@todo/pages/Todo/Todo.loader';
import { todosLoader } from '@todo/pages/Todos/Todos.loader';
import { RouteObject } from 'react-router-dom';

export const todosPath = {
  root: '/todos',
  index: '',
  detail: ':id',
} as const;

export const todosDetailRoute = {
  id: 'todos:detail' as const,
  path: todosPath.detail,
  lazy: async () => {
    const { default: TodoPage } = await import('../pages/Todo/Todo.page');

    return {
      action: todoAction(queryClient),
      loader: todoLoader(queryClient),
      element: <TodoPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} satisfies RouteObject;

export const todosIndexRoute = {
  id: 'todos:index' as const,
  index: true,
  lazy: async () => {
    const { default: TodosPage } = await import('../pages/Todos/Todos.page');

    return {
      loader: todosLoader(queryClient),
      element: <TodosPage />,
      errorElement: <RouteErrorBoundary />,
    };
  },
} satisfies RouteObject;

export const todosRoute = {
  id: 'todos' as const,
  path: todosPath.root,
  element: <NavbarWrapper />,
  children: [todosIndexRoute, todosDetailRoute],
} satisfies RouteObject;
