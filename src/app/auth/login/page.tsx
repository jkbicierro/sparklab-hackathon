import { LoginForm } from "@/components/forms/loginForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - OpenBayan",
  description: "Login to your OpenBayan account",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  } else {
    redirect("/map");
  }

  return (
    <>
      <main className="h-dvh flex flex-col items-center justify-center">
        <div className="w-[350px] space-y-5">
          <h2>Welcome back!</h2>
          <LoginForm />
        </div>
      </main>
    </>
  );
}
