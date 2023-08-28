import { setupTest } from '@shared/utils/test.util';
import { screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import HomePage from './Home.page';

describe('HomePage', () => {
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

  it('should render text correctly', () => {
    // ARRANGE
    renderProviders(router);
    const heading: HTMLHeadingElement = screen.getByRole('heading', {
      level: 1,
    });

    // ASSERT
    expect(heading).toBeInTheDocument();
  });
});
