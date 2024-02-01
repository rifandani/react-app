import type { QueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import type { Except, SetRequired } from 'type-fest'
import type {
  ErrorApiResponseSchema,
  ResourceParamsSchema,
} from '#shared/schemas/api.schema'
import { todoApi, todoKeys } from '#todo/apis/todo.api'
import { defaultLimit } from '#todo/constants/todos.constant'
import type { TodoListApiResponseSchema } from '#todo/apis/todo.api'

/**
 * todos search params in object
 */
export function useTodosParams() {
  const [searchParams] = useSearchParams()
  const searchParamsObj = Object.fromEntries(searchParams)

  const limit = Number(searchParamsObj?.limit ?? defaultLimit)
  const params: SetRequired<ResourceParamsSchema, 'limit'> = {
    ...searchParamsObj,
    limit,
  }

  return params
}

/**
 * fetch todos based on search params
 */
export function useTodos(
  options?: Except<
    QueryOptions<TodoListApiResponseSchema, ErrorApiResponseSchema>,
    'queryKey' | 'queryFn'
  >,
) {
  const params = useTodosParams()
  const queryKey = todoKeys.list(params)
  const queryFn = () => todoApi.list(params)

  return useQuery({
    ...options,
    queryKey,
    queryFn,
  })
}
