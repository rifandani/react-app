import { setupTest } from '@shared/utils/test.util';
import { fireEvent, screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import LoginForm from './LoginForm.component';

describe('LoginForm', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/login',
      element: <LoginForm />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/login'],
    initialIndex: 0,
  });
  const validUsernameValue = 'kminchelle';
  const validPasswordValue = '0lelplR';
  const mockSubmitFn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  it('should be able to type the inputs and submit the login form', () => {
    // ARRANGE
    renderProviders(router);
    const formLogin: HTMLFormElement = screen.getByRole('form', {
      name: /login/i,
    });
    const inputUsername: HTMLInputElement =
      screen.getByPlaceholderText(/username/i);
    const inputPassword: HTMLInputElement =
      screen.getByPlaceholderText(/password/i);
    const buttonSubmit: HTMLButtonElement = screen.getByRole('button', {
      name: /login/i,
    });
    buttonSubmit.addEventListener('click', mockSubmitFn);

    // ACT & ASSERT
    expect(formLogin).toBeInTheDocument();
    expect(inputUsername).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    fireEvent.change(inputUsername, { target: { value: validUsernameValue } });
    fireEvent.change(inputPassword, { target: { value: validPasswordValue } });
    expect(inputUsername).toHaveValue(validUsernameValue);
    expect(inputPassword).toHaveValue(validPasswordValue);
    fireEvent.click(buttonSubmit);
    expect(mockSubmitFn).toHaveBeenCalled();
  });
});
