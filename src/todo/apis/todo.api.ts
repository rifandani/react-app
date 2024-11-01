import {
  resourceListRequestSchema,
  resourceListResponseSchema,
} from '#/core/schemas/api.schema';
import { http } from '#/core/services/http.service';
import type { Options } from 'ky';
import { z } from 'zod';

// #region ENTITY SCHEMA
export const todoSchema = z.object({
  id: z.number().positive(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.number().positive(),
});
// #endregion

// #region API SCHEMA
export const todoListRequestSchema = resourceListRequestSchema;
export const todoListResponseSchema = resourceListResponseSchema.extend({
  todos: z.array(todoSchema),
});
export const todoDetailRequestSchema = z.number();
export const todoDetailResponseSchema = todoSchema;
export const todoCreateRequestSchema = todoSchema;
export const todoCreateResponseSchema = todoSchema;
export const todoUpdateRequestSchema = todoSchema.omit({ userId: true });
export const todoUpdateResponseSchema = todoSchema;
export const todoDeleteRequestSchema = z.number();
export const todoDeleteResponseSchema = todoSchema.extend({
  isDeleted: z.literal(true),
  deletedOn: z.string().datetime(),
});
// #endregion

// #region SCHEMA TYPES
export type TodoSchema = z.infer<typeof todoSchema>;
export type TodoListRequestSchema = z.infer<typeof todoListRequestSchema>;
export type TodoListResponseSchema = z.infer<typeof todoListResponseSchema>;
export type TodoDetailRequestSchema = z.infer<typeof todoDetailRequestSchema>;
export type TodoDetailResponseSchema = z.infer<typeof todoDetailResponseSchema>;
export type TodoCreateRequestSchema = z.infer<typeof todoCreateRequestSchema>;
export type TodoCreateResponseSchema = z.infer<typeof todoCreateResponseSchema>;
export type TodoUpdateRequestSchema = z.infer<typeof todoUpdateRequestSchema>;
export type TodoUpdateResponseSchema = z.infer<typeof todoUpdateResponseSchema>;
export type TodoDeleteRequestSchema = z.infer<typeof todoDeleteRequestSchema>;
export type TodoDeleteResponseSchema = z.infer<typeof todoDeleteResponseSchema>;
// #endregion

export const todoKeys = {
  all: ['todos'] as const,
  list: (params: TodoListRequestSchema | undefined) =>
    [todoKeys.all, 'list', ...(params ? [params] : [])] as const,
  detail: (id: TodoDetailRequestSchema | undefined) =>
    [todoKeys.all, 'detail', ...(id ? [id] : [])] as const,
  create: (params: TodoCreateRequestSchema | undefined) =>
    [todoKeys.all, 'create:mutation', ...(params ? [params] : [])] as const,
  update: (params: TodoUpdateRequestSchema | undefined) =>
    [todoKeys.all, 'update:mutation', ...(params ? [params] : [])] as const,
  delete: (id: TodoDeleteRequestSchema | undefined) =>
    [todoKeys.all, 'delete:mutation', ...(id ? [id] : [])] as const,
};

export const todoRepositories = {
  /**
   * @url GET ${env.apiBaseUrl}/todos
   * @note could throw error in `HttpError` or `ZodError` error
   */
  list: async (params: TodoListRequestSchema, options?: Options) => {
    const resp = await http.instance
      .get('todos', {
        searchParams: params,
        ...options,
      })
      .json();

    return todoListResponseSchema.parse(resp);
  },
  /**
   * @url GET ${env.apiBaseUrl}/todos/${id}
   * @note could throw error in `HttpError` or `ZodError` error
   */
  detail: async (id: TodoDetailRequestSchema, options?: Options) => {
    const resp = await http.instance.get(`todos/${id}`, options).json();

    return todoDetailResponseSchema.parse(resp);
  },
  /**
   * @url POST ${env.apiBaseUrl}/todos/add
   * @note could throw error in `HttpError` or `ZodError` error
   */
  create: async (todo: TodoCreateRequestSchema, options?: Options) => {
    const resp = await http.instance
      .post('todos/add', { json: todo, ...options })
      .json();

    return todoCreateResponseSchema.parse(resp);
  },
  /**
   * @url PUT ${env.apiBaseUrl}/todos/${id}
   * @note could throw error in `HttpError` or `ZodError` error
   */
  update: async (
    { id, ...body }: TodoUpdateRequestSchema,
    options?: Options,
  ) => {
    const resp = await http.instance
      .put(`todos/${id}`, { json: body, ...options })
      .json();

    return todoUpdateResponseSchema.parse(resp);
  },
  /**
   * @url DELETE ${env.apiBaseUrl}/todos/${id}
   * @note could throw error in `HttpError` or `ZodError` error
   */
  delete: async (id: TodoDeleteRequestSchema, options?: Options) => {
    const resp = await http.instance.delete(`todos/${id}`, options).json();

    return todoDeleteResponseSchema.parse(resp);
  },
} as const;
