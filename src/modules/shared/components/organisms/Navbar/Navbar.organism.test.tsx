import NotFoundPage from '@auth/pages/NotFound/NotFound.page';
import { setupTest } from '@shared/utils/test.util';
import { screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/whatever'],
    initialIndex: 1,
  });

  it('should render properly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  it('should be able to type the inputs and submit the login form', () => {
    // ARRANGE
    renderProviders(router);
    const link: HTMLAnchorElement = screen.getByRole('link', { name: /logo/i });
    const checkbox: HTMLInputElement = screen.getByRole('checkbox', {
      name: /drawer/i,
    });

    // ASSERT
    expect(link).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
  });
});
