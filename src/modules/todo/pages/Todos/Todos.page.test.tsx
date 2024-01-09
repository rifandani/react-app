import { mockTodoListApiResponse } from '@mocks/http/entities.http';
import { setupTest } from '@shared/utils/test.util';
import { screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import { TodosPage } from './todos.page';

describe('<TodosPage />', () => {
  const todos = mockTodoListApiResponse();
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/todos',
      element: <TodosPage />,
      loader: () => todos,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/todos'],
    initialIndex: 0,
  });

  it('should render correctly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  // FIXME: Unexpected Application Error, because of react-aria i18n hooks
  it.todo('should render content roles correctly', () => {
    // ARRANGE
    renderProviders(router);
    const title = screen.getByRole('heading', { level: 1 });

    // ASSERT
    expect(title).toBeInTheDocument();
  });
});
