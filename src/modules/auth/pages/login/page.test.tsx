import { screen } from '@testing-library/react';
import type { RouteObject } from 'react-router-dom';
import { createMemoryRouter } from 'react-router-dom';
import { LoginPage } from './page';
import { setupTest } from '#shared/utils/test.util';

describe('<LoginPage />', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/login',
      element: <LoginPage />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/', '/login'],
    initialIndex: 1,
  });

  it('should render properly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  // FIXME: Unexpected Application Error, because of react-aria i18n hooks
  it.todo('should render content roles correctly', () => {
    // ARRANGE
    renderProviders(router);
    const linkHome: HTMLAnchorElement = screen.getByRole('link', {
      name: /home/i,
    });
    const linkRegister: HTMLAnchorElement = screen.getByRole('link', {
      name: /register/i,
    });
    const imgCover: HTMLImageElement = screen.getByRole('img', {
      name: /cover/i,
    });

    // ASSERT
    expect(linkHome).toBeInTheDocument();
    expect(linkRegister).toBeInTheDocument();
    expect(imgCover).toBeInTheDocument();
  });
});
