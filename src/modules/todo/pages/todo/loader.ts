import type { LoaderFunctionArgs } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import type { queryClient } from '#app/providers/query/client'
import { checkAuthUser } from '#shared/utils/checker.util'
import { todoApi, todoKeys } from '#todo/apis/todo.api'
import type { TodoDetailApiResponseSchema } from '#todo/schemas/todo.schema'
import { authPath } from '#auth/routes'

export function todoLoader(_queryClient: typeof queryClient) {
  return async ({ params }: LoaderFunctionArgs) => {
    const authed = checkAuthUser()

    // redirect NOT authed user to login
    if (!authed) {
      toast.error('Unauthorized')
      return redirect(authPath.login)
    }

    const queryKey = todoKeys.detail(Number(params.id))
    const queryFn = () => todoApi.detail(Number(params.id))
    const staleTime = 1_000 * 60 * 1 // 1 min

    // or we can use `_queryClient.ensureQueryData`
    const todoDetailCache
      = _queryClient.getQueryData<TodoDetailApiResponseSchema>(queryKey)
    const todoDetailData = await _queryClient.fetchQuery({
      queryKey,
      queryFn,
      staleTime,
    })

    return todoDetailCache ?? todoDetailData
  }
}
