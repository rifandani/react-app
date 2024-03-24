import { http } from '#shared/services/http.service';
import { z } from 'zod';

export type LoginSchema = z.infer<typeof loginSchema>;
export type LoginApiResponseSchema = z.infer<typeof loginApiResponseSchema>;

// #region SCHEMAS
export const loginSchema = z.object({
  username: z.string().min(3, 'username must contain at least 3 characters'),
  password: z.string().min(6, 'password must contain at least 6 characters'),
  expiresInMins: z.number().optional(),
});

export const loginApiResponseSchema = z.object({
  id: z.number().positive(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.union([z.literal('male'), z.literal('female')]),
  image: z.string().url(),
  token: z.string(),
});
// #endregion

export const authApi = {
  login: async (creds: LoginSchema) => {
    const resp = await http
      .post('auth/login', {
        throwHttpErrors: false, // i'm expecting error response from the backend
        json: creds,
        hooks: {
          afterResponse: [
            async (request, _options, response) => {
              if (response.status === 200) {
                const data = (await response.json()) as LoginApiResponseSchema;
                // set 'Authorization' headers
                request.headers.set('Authorization', `Bearer ${data.token}`);
              }
            },
          ],
        },
      })
      .json<LoginApiResponseSchema>();

    // we also can use `parse` here. `parse` will throw if `resp.data` is not correct, and therefore can render `errorElement` if specified
    // const loginApiResponse = loginApiResponseSchema.parse(resp.data);

    return resp;
  },
} as const;
