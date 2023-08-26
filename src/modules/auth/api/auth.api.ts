import { ErrorApiResponseSchema } from '@shared/api/api.schema';
import { http } from '@shared/services/api/http.api';
import {
  LoginApiResponseSchema,
  loginApiResponseSchema,
  type LoginSchema,
} from './auth.schema';

export const login = async (creds: LoginSchema) => {
  const resp = await http.post(`auth/login`, creds);

  // `parse` will throw if `resp.data` is not correct
  const loginApiResponse = loginApiResponseSchema.parse(resp.data);
  // set 'Authorization' headers to
  http.defaults.headers.common.Authorization = `Bearer ${loginApiResponse.token}`;

  return loginApiResponse;
};

export const loginWithoutParse = async (creds: LoginSchema) => {
  const resp = await http.post<LoginApiResponseSchema | ErrorApiResponseSchema>(
    `auth/login`,
    creds,
  );

  // set 'Authorization' headers to
  if (resp.status === 200 && 'token' in resp.data)
    http.defaults.headers.common.Authorization = `Bearer ${resp.data.token}`;

  return resp.data;
};
