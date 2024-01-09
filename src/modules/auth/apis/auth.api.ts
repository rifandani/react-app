import { ErrorApiResponseSchema } from '@shared/schemas/api.schema';
import { http } from '@shared/services/http.service';
import {
  LoginApiResponseSchema,
  type LoginSchema,
} from '../schemas/auth.schema';

export const authApi = {
  login: async (creds: LoginSchema) => {
    const resp = await http.post<
      LoginApiResponseSchema | ErrorApiResponseSchema
    >(`auth/login`, creds);

    // we also can use `parse` here. `parse` will throw if `resp.data` is not correct, and therefore can render `errorElement` if specified
    // const loginApiResponse = loginApiResponseSchema.parse(resp.data);

    // set 'Authorization' headers
    if (resp.status === 200 && 'token' in resp.data)
      http.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`;

    return resp.data;
  },
} as const;
