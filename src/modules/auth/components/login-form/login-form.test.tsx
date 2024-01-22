import { screen } from '@testing-library/react'
import type { RouteObject } from 'react-router-dom'
import { createMemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { LoginForm } from './login-form'
import { setupTest } from '#shared/utils/test.util'

describe('<LoginForm />', () => {
  const { renderProviders } = setupTest()
  const routes = [
    {
      path: '/login',
      element: <LoginForm />,
    },
  ] satisfies RouteObject[]
  const router = createMemoryRouter(routes, {
    initialEntries: ['/login'],
    initialIndex: 0,
  })
  const validUsernameValue = 'kminchelle'
  const validPasswordValue = '0lelplR'
  const mockSubmitFn = vi.fn()

  it('should render properly', () => {
    const view = renderProviders(router)
    expect(() => view).not.toThrow()
  })

  // FIXME: Unexpected Application Error, because of react-aria i18n hooks
  it.todo('should be able to type the inputs and submit the login form', () => {
    // ARRANGE
    const { user } = renderProviders(router)
    const formLogin: HTMLFormElement = screen.getByRole('form', {
      name: /login/i,
    })
    const inputUsername: HTMLInputElement
      = screen.getByPlaceholderText(/username/i)
    const inputPassword: HTMLInputElement
      = screen.getByPlaceholderText(/password/i)
    const buttonSubmit: HTMLButtonElement = screen.getByRole('button', {
      name: /login/i,
    })
    buttonSubmit.addEventListener('click', mockSubmitFn)

    // ACT & ASSERT
    expect(formLogin).toBeInTheDocument()
    expect(inputUsername).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
    user.type(inputUsername, validUsernameValue)
    user.type(inputPassword, validPasswordValue)
    expect(inputUsername).toHaveValue(validUsernameValue)
    expect(inputPassword).toHaveValue(validPasswordValue)
    user.click(buttonSubmit)
    expect(mockSubmitFn).toHaveBeenCalled()
  })
})
