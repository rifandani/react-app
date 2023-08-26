import { themes } from '@shared/constants/theme.constant';
import { fireEvent, render, screen } from '@testing-library/react';
import { I18nProvider } from 'react-aria';
import { vi } from 'vitest';
import NavbarMenu from './NavbarMenu.organism';

describe('NavBarMenu', () => {
  const mockModeBtn = vi.fn();

  it('should render properly', () => {
    const view = render(
      <I18nProvider>
        <NavbarMenu />
      </I18nProvider>,
    );
    expect(() => view).not.toThrow();
  });

  it('should render role contents correctly', () => {
    // ARRANGE
    render(
      <I18nProvider>
        <NavbarMenu />
      </I18nProvider>,
    );
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
    fireEvent.click(modesBtn[0]);
    expect(link).toBeInTheDocument();
    expect(themeBtn).toBeInTheDocument();
    expect(modesBtn).toHaveLength(themes.length);
    expect(mockModeBtn).toHaveBeenCalled();
  });
});
