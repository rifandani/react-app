import { screen } from '@testing-library/react'
import type { RouteObject } from 'react-router-dom'
import { createMemoryRouter } from 'react-router-dom'
import { TodosItem } from './todos-item'
import { mockLogin, mockTodo } from '#mocks/http/entities.http'
import { setupTest } from '#shared/utils/test.util'
import type { TodoSchema } from '#todo/apis/todo.api'

describe('<TodosItem />', () => {
  const todo: TodoSchema = mockTodo()
  const user = mockLogin({ id: todo.userId })
  const { renderProviders } = setupTest()
  const routes = [
    {
      path: '/todos',
      element: <TodosItem todo={todo} />,
    },
  ] satisfies RouteObject[]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/todos'],
    initialIndex: 0,
  })
  const mockDeleteTodo = vi.fn()
  const mockSubmit = vi.fn()
  const mockChangeTodo = vi.fn()
  const getItemSpy = vi.spyOn(localStorage, 'getItem')
  localStorage.getItem = vi.fn(() => JSON.stringify(user))

  afterEach(() => {
    getItemSpy.mockClear() // clear call history
    localStorage.clear()
  })

  it('should render properly', () => {
    const view = renderProviders(router)
    expect(() => view).not.toThrow()
  })

  it('should update todo correctly', async () => {
    // ARRANGE
    const { user: userEvent } = renderProviders(router)
    const form: HTMLFormElement = await screen.findByRole('form', {
      name: /todo/i,
    })
    const inputId: HTMLInputElement = await screen.findByTestId('input-todoId')
    const inputTodo: HTMLInputElement = await screen.findByRole('checkbox', {
      name: /todo/i,
    })
    const link: HTMLAnchorElement = await screen.findByRole('link', {
      name: /todo/i,
    })
    form.addEventListener('submit', mockSubmit)
    inputTodo.addEventListener('change', mockChangeTodo)

    // ACT & ASSERT
    expect(form).toBeInTheDocument()
    expect(inputId).toBeInTheDocument()
    expect(inputId).toHaveValue(todo.id.toString())
    expect(inputTodo).toBeInTheDocument()
    expect(inputTodo).not.toBeChecked()
    expect(link).toBeInTheDocument()
    await userEvent.click(inputTodo)
    expect(mockChangeTodo).toHaveBeenCalled()
  })

  // FIXME: button not exists, because zustand store `useUserStore`
  it.todo('should remove todo correctly', async () => {
    // ARRANGE
    const { user: userEvent } = renderProviders(router)
    const removeBtn: HTMLButtonElement = await screen.findByRole('button')

    // ACT & ASSERT
    expect(removeBtn).toBeInTheDocument()
    await userEvent.click(removeBtn)
    expect(mockSubmit).toHaveBeenCalled()
    expect(mockDeleteTodo).toHaveBeenCalled()
  })
})
