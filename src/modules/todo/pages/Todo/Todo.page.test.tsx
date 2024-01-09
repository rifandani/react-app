import { mockTodo } from '@mocks/http/entities.http';
import { setupTest } from '@shared/utils/test.util';
import { screen } from '@testing-library/react';
import { todoApi } from '@todo/apis/todo.api';
import { todosPath } from '@todo/routes/todos.route';
import { UpdateTodoSchema } from '@todo/schemas/todo.schema';
import { RouteObject, createMemoryRouter, redirect } from 'react-router-dom';
import { TodoPage } from './todo.page';

describe('<TodoPage />', () => {
  const todo = mockTodo();
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/todos/:id',
      element: <TodoPage />,
      action: async ({ request }) => {
        if (request.method === 'PUT') {
          const payload = (await request.json()) as UpdateTodoSchema;
          await todoApi.update(payload);

          return redirect(todosPath.root);
        }

        return new Response('Not Implemented', { status: 501 });
      },
      loader: () => todo,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/todos/1'],
    initialIndex: 0,
  });

  it('should render correctly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  // FIXME: Unexpected Application Error, because of react-aria i18n hooks
  it.todo('should render role contents correctly', () => {
    // ARRANGE
    renderProviders(router);
    const link: HTMLAnchorElement = screen.getByRole('link', {
      name: /go-back/i,
    });
    const title: HTMLHeadingElement = screen.getByRole('heading', { level: 1 });

    // ASSERT
    expect(link).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
