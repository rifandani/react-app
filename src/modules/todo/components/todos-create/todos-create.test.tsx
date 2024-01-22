import type { ByRoleOptions } from '@testing-library/react'
import { screen } from '@testing-library/react'
import type { RouteObject } from 'react-router-dom'
import { createMemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { TodosCreate } from './todos-create'
import { setupTest } from '#shared/utils/test.util'

describe('<TodosCreate />', () => {
  const { renderProviders } = setupTest()
  const routes = [
    {
      path: '/todos',
      element: <TodosCreate />,
    },
  ] satisfies RouteObject[]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/todos'],
    initialIndex: 0,
  })
  const todoValue = 'new todo'
  const mockCreateSubmitFn = vi.fn()

  it('should render properly', () => {
    const view = renderProviders(router)
    expect(() => view).not.toThrow()
  })

  // FIXME: Unexpected Application Error, because of react-aria i18n hooks
  it.todo(
    'should be able to type the inputs and submit the create todo form',
    () => {
      // ARRANGE
      const { user } = renderProviders(router)
      const createOptions: ByRoleOptions = { name: /add/i }
      const formCreate: HTMLFormElement = screen.getByRole('form')
      const inputTodo: HTMLInputElement = screen.getByRole(
        'textbox',
        createOptions,
      )
      const buttonSubmit: HTMLButtonElement = screen.getByRole(
        'button',
        createOptions,
      )
      buttonSubmit.addEventListener('click', mockCreateSubmitFn)

      // ACT & ASSERT
      expect(formCreate).toBeInTheDocument()
      expect(inputTodo).toBeInTheDocument()
      expect(buttonSubmit).toBeInTheDocument()
      user.type(inputTodo, todoValue)
      expect(inputTodo).toHaveValue(todoValue)
      user.click(buttonSubmit)
      expect(mockCreateSubmitFn).toHaveBeenCalled()
    },
  )
})
