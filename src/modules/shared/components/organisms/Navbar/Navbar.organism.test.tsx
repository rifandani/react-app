import { setupTest } from '@shared/utils/test.util';
import { screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import Navbar from './Navbar.organism';

describe('Navbar', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/login', // to make `useCheckAuth` works
      element: <Navbar />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/login'],
    initialIndex: 0,
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
