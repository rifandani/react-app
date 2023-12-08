import { LoginSchema, loginSchema } from "@auth/api/auth.schema";
import { loginFormDefaultValues } from "@auth/constants/login.constant";
import { zodResolver } from "@hookform/resolvers/zod";
import useI18n from "@shared/hooks/useI18n/useI18n.hook";
import { useForm } from "react-hook-form";
import { useFetcher } from "react-router-dom";

export default function useLoginForm() {
  const [t] = useI18n();
  const fetcher = useFetcher();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginFormDefaultValues,
    mode: "onChange",
  });

  return { t, fetcher, form };
}
