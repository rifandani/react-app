import { HttpResponse, http } from 'msw'
import { getBaseUrl } from '../../util.mock'

const validEmail = 'email@email.com'
const validPassword = 'password'

export const authHandlers = [
  // @ts-expect-error ignore
  http.post(getBaseUrl('auth/login'), async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string
      password: string
    }

    if (email === validEmail && password === validPassword) {
      return HttpResponse.json(
        {
          ok: true,
          login: {
            token: 'token',
          },
        },
        { status: 200 },
      )
    }

    return HttpResponse.json(
      { ok: false, error: { code: 'auth/invalid-credentials' } },
      { status: 401 },
    )
  }),
]
