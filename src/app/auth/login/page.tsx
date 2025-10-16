import { LoginForm } from "@/components/forms/loginForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Log in - VibeBayan",
  description: "Log in to your account on VibeBayan",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    console.log(data?.user.id);
    redirect("/map");
  }

  return (
    <>
      <main className="h-dvh flex flex-col items-center justify-center">
        <div className="w-[350px] space-y-5">
          <Image
            src={"/assets/vibebayan-logo.png"}
            alt="VibeBayan Logo"
            width={1000}
            height={1000}
            className="w-[40px] h-[40px]"
          />
          <h2>Welcome back!</h2>
          <LoginForm />
          <small>
            Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
          </small>
        </div>
      </main>
    </>
  );
}
