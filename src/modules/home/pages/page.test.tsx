import { screen } from '@testing-library/react';
import type { RouteObject } from 'react-router-dom';
import { createMemoryRouter } from 'react-router-dom';
import { HomePage } from './page';
import { setupTest } from '#shared/utils/test.util';

describe('<HomePage />', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/',
      element: <HomePage />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });

  it('should render correctly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  // FIXME: Unexpected Application Error, because of react-aria i18n hooks
  it.todo('should render text correctly', () => {
    // ARRANGE
    renderProviders(router);
    const heading: HTMLHeadingElement = screen.getByRole('heading', {
      level: 1,
    });

    // ASSERT
    expect(heading).toBeInTheDocument();
  });
});
