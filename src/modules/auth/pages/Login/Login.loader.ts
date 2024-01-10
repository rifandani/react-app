import type { LoaderFunction } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import { homePath } from '#home/routes/home.route'
import { checkAuthUser } from '#shared/utils/checker.util'

export const loginLoader: LoaderFunction = () => {
  const authed = checkAuthUser()

  // redirect auth user to home
  if (authed) {
    toast.info('Already Logged In')
    return redirect(homePath.root)
  }

  return null
}
