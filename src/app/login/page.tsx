"use client";

import { AuthenticatorAws } from "@/components/Auth";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const user = useCurrentUser();

  if (user.userId) router.push("/");

  return <AuthenticatorAws />;
};

export default LoginPage;
