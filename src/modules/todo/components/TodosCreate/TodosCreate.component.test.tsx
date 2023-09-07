import { setupTest } from '@shared/utils/test.util';
import { ByRoleOptions, fireEvent, screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import TodosCreate from './TodosCreate.component';

describe('TodosCreate', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/todos',
      element: <TodosCreate />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/todos'],
    initialIndex: 0,
  });
  const todoValue = 'new todo';
  const mockCreateSubmitFn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  it('should be able to type the inputs and submit the create todo form', () => {
    // ARRANGE
    renderProviders(router);
    const createOptions: ByRoleOptions = { name: /add/i };
    const formCreate: HTMLFormElement = screen.getByRole('form');
    const inputTodo: HTMLInputElement = screen.getByRole(
      'textbox',
      createOptions,
    );
    const buttonSubmit: HTMLButtonElement = screen.getByRole(
      'button',
      createOptions,
    );
    buttonSubmit.addEventListener('click', mockCreateSubmitFn);

    // ACT & ASSERT
    expect(formCreate).toBeInTheDocument();
    expect(inputTodo).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
    fireEvent.change(inputTodo, { target: { value: todoValue } });
    expect(inputTodo).toHaveValue(todoValue);
    fireEvent.click(buttonSubmit);
    expect(mockCreateSubmitFn).toHaveBeenCalled();
  });
});
