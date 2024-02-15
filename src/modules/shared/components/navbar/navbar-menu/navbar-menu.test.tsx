import { screen } from '@testing-library/react';
import type { RouteObject } from 'react-router-dom';
import { createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { NavbarMenu } from './navbar-menu';
import { setupTest } from '#shared/utils/test.util';
import { themes } from '#shared/constants/theme.constant';

describe('<NavBarMenu />', () => {
  const mockModeBtn = vi.fn();
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/',
      element: <NavbarMenu />,
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

  // FIXME: Unexpected Application Error, because of react-aria i18n hooks
  it.todo('should render role contents correctly', () => {
    // ARRANGE
    const { user } = renderProviders(router);
    const link: HTMLAnchorElement = screen.getByRole('link', {
      name: /todos/i,
    });
    const themeBtn: HTMLButtonElement = screen.getByRole('button', {
      name: /themes-opener/i,
    });
    const modesBtn: HTMLButtonElement[] = screen.getAllByRole('button', {
      name: /theme-/i,
    });

    // ACT & ASSERT
    modesBtn[0].addEventListener('click', mockModeBtn);
    user.click(modesBtn[0]);
    expect(link).toBeInTheDocument();
    expect(themeBtn).toBeInTheDocument();
    expect(modesBtn).toHaveLength(themes.length);
    expect(mockModeBtn).toHaveBeenCalled();
  });
});
