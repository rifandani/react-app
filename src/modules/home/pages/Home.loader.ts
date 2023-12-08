import { authPath } from "@auth/routes/auth.route";
import { checkAuthUser } from "@shared/utils/checker/checker.util";
import { LoaderFunction, redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const homeLoader: LoaderFunction = () => {
  const authed = checkAuthUser();

  // redirect NOT authed user to login
  if (!authed) {
    toast.error("Unauthorized");
    return redirect(authPath.login);
  }

  return null;
};
