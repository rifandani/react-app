import { setupTest } from '@shared/utils/test.util';
import { screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFound.page';

describe('NotFoundPage', () => {
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

  it('should render contents correctly', () => {
    // ARRANGE
    renderProviders(router);
    const heading: HTMLHeadingElement = screen.getByText(/404/i);
    const paragraph: HTMLParagraphElement = screen.getByText(/gone/i);
    const anchor: HTMLAnchorElement = screen.getByRole('link');

    // ASSERT
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(anchor).toBeInTheDocument();
  });
});
