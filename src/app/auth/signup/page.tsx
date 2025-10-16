import { RegisterForm } from "@/components/forms/registerForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Register - VibeBayan",
  description: "Create a new account on VibeBayan",
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
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
          <h2>Let&apos;s get you registered!</h2>
          <RegisterForm />
          <small>
            Already have an account? <a href="/auth/login">Log in</a>
          </small>
        </div>
      </main>
    </>
  );
}
