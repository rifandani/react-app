import { setupTest } from '@shared/utils/test.util';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import { ClockSectionTimer } from './clock-section-timer';

describe('<ClockSectionTimer />', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/',
      element: <ClockSectionTimer hours={1} minutes={2} seconds={3} />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });

  it('should render properly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });
});
