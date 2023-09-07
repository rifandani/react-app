import { authApi } from '@auth/api/auth.api';
import { loginSchema } from '@auth/api/auth.schema';
import { useUserStore } from '@auth/hooks/useUserStore/useUserStore.hook';
import { homePath } from '@home/routes/home.route';
import { unstable_batchedUpdates } from 'react-dom';
import { ActionFunctionArgs, json, redirect } from 'react-router-dom';

export async function loginAction({ request }: ActionFunctionArgs) {
  const payload = Object.fromEntries(await request.formData());

  // if `payload` is not correct, return error object
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) return json(parsed.error, { status: 400 });

  // will throw if `login` returns 500 error, therefore `errorElement` will be rendered
  const loginResponse = await authApi.login(parsed.data);

  // on 400 error
  if ('message' in loginResponse) return json(loginResponse);

  // see https://docs.pmnd.rs/zustand/recipes/recipes#calling-actions-outside-a-react-event-handler
  unstable_batchedUpdates(() => {
    useUserStore.getState().setUser(loginResponse); // set user data to store
  });

  return redirect(homePath.root);
}
