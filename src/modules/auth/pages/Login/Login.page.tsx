import reactjs from "@assets/images/reactjs.svg";
import LoginForm from "@auth/components/LoginForm/LoginForm.component";
import { homePath } from "@home/routes/home.route";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import useLoginPageVM from "./Login.vm";

export default function LoginPage() {
  const { t } = useLoginPageVM();

  return (
    <main id="LoginPage" className="h-screen">
      <div className="flex w-full flex-wrap">
        {/* <!-- Login Section --> */}
        <section className="flex w-full flex-col md:w-1/2">
          <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
            <Link
              to={homePath.root}
              aria-label="link-home"
              className="relative cursor-pointer rounded-full hover:text-primary"
            >
              <Icon icon="lucide:home" height="1.5em" />
            </Link>
          </div>

          <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
            <h1 className="text-center text-3xl text-primary">
              {t("welcome")}
            </h1>

            <LoginForm />

            <p className="py-12 text-center">
              {t("noAccount")}{" "}
              <Link
                className="link link-primary"
                aria-label="link-register"
                to="/register"
              >
                {t("registerHere")}
              </Link>
            </p>
          </div>
        </section>

        {/* <!-- Image Section --> */}
        <section className="w-1/2 shadow-2xl">
          <span className="relative hidden h-screen w-full md:flex md:items-center md:justify-center">
            <img
              src={reactjs}
              alt="login page cover"
              loading="lazy"
              aria-label="img-cover"
              className="h-full object-cover"
            />
          </span>
        </section>
      </div>
    </main>
  );
}
