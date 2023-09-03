import { setupTest } from '@shared/utils/test.util';
import { fireEvent, screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import TodosFilter from './TodosFilter.component';

describe('TodosFilter', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/todos',
      element: <TodosFilter />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/todos'],
    initialIndex: 0,
  });
  const validLimit = '10';
  const mockChangeFn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  it('should render and change limit correctly', () => {
    // ARRANGE
    renderProviders(router);
    const form: HTMLFormElement = screen.getByRole('form');
    const select: HTMLInputElement = screen.getByRole('combobox', {
      name: /filter/i,
    });
    const options: HTMLOptionElement[] = screen.getAllByRole('option');
    select.addEventListener('select', mockChangeFn);

    // ACT & ASSERT
    expect(form).toBeInTheDocument();
    expect(select).toBeInTheDocument();
    expect(options).toHaveLength(4);
    fireEvent.select(select, { target: { value: validLimit } });
    expect(select).toHaveValue(validLimit);
    expect(mockChangeFn).toHaveBeenCalled();
  });
});
