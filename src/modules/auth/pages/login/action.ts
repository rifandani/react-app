import { unstable_batchedUpdates } from 'react-dom'
import type { ActionFunctionArgs } from 'react-router-dom'
import { json, redirect } from 'react-router-dom'
import { authApi, loginSchema } from '#auth/apis/auth.api'
import { useUserStore } from '#auth/hooks/use-user-store.hook'
import { homePath } from '#home/routes'

export async function loginAction({ request }: ActionFunctionArgs) {
  const payload = Object.fromEntries(await request.formData())

  // if `payload` is not correct, return error object
  const parsed = loginSchema.safeParse(payload)
  if (!parsed.success)
    return json(parsed.error, { status: 400 })

  // will throw if `login` returns 500 error, therefore `errorElement` will be rendered
  const loginResponse = await authApi.login(parsed.data)

  // on 400 error
  if ('message' in loginResponse)
    return json(loginResponse)

  // see https://docs.pmnd.rs/zustand/recipes/recipes#calling-actions-outside-a-react-event-handler
  unstable_batchedUpdates(() => {
    useUserStore.getState().setUser(loginResponse) // set user data to store
  })

  return redirect(homePath.root)
}
