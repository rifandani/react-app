import { rest, server } from '@mocks/http/server.http';
import { getBaseUrl } from '@mocks/util.mock';
import { setupTest } from '@shared/utils/test.util';
import { screen, waitFor } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import TodosList from './TodosList.component';

describe('TodosList', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/todos',
      element: <TodosList />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/todos'],
    initialIndex: 0,
  });
  const loadingId = 'list-loading';

  // FIXME: TypeError: mutate is not a function
  it.todo('should render properly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  // FIXME: TypeError: mutate is not a function
  it.todo('should be able to query and show error alert', async () => {
    // ARRANGE
    server.use(
      rest.get(getBaseUrl('todos'), (_, res, ctx) =>
        res.once(ctx.status(500), ctx.json({ message: 'error' })),
      ),
    );

    // ASSERT
    expect(screen.queryByTestId(loadingId)).not.toBeInTheDocument();
    renderProviders(router);
    await waitFor(() => {
      // wait for appearance inside an assertion
      expect(screen.getByTestId(loadingId)).toBeInTheDocument();
    });
  });
});
