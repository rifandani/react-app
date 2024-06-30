import { http } from '#shared/services/http.service';
import { z } from 'zod';

// #region API SCHEMAS
export const authLoginRequestSchema = z.object({
  username: z.string().min(3, 'username must contain at least 3 characters'),
  password: z.string().min(6, 'password must contain at least 6 characters'),
  expiresInMins: z.number().optional(),
});
export const authLoginResponseSchema = z.object({
  id: z.number().positive(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.union([z.literal('male'), z.literal('female')]),
  image: z.string().url(),
  token: z.string(),
});
// #endregion API SCHEMAS

// #region SCHEMAS TYPES
export type AuthLoginRequestSchema = z.infer<typeof authLoginRequestSchema>;
export type AuthLoginResponseSchema = z.infer<typeof authLoginResponseSchema>;
// #endregion SCHEMAS TYPES

export const authKeys = {
  all: ['auth'] as const,
  login: (params: AuthLoginRequestSchema | undefined) =>
    [...authKeys.all, 'login', ...(params ? [params] : [])] as const,
};

export const authRepositories = {
  /**
   * @url POST ${env.apiBaseUrl}/auth/login
   * @note could throw error in `HttpError` or `ZodError` error
   */
  login: async ({ json }: { json: AuthLoginRequestSchema }) => {
    const resp = await http
      .post('auth/login', {
        json,
        hooks: {
          afterResponse: [
            async (request, _options, response) => {
              if (response.status === 200) {
                const data = (await response.json()) as AuthLoginResponseSchema;

                if ('token' in data) {
                  // set 'Authorization' headers
                  request.headers.set('Authorization', `Bearer ${data.token}`);
                }
              }
            },
          ],
        },
      })
      .json<AuthLoginResponseSchema>();

    return authLoginResponseSchema.parse(resp);
  },
} as const;
