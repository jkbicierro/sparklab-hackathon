import { RegisterForm } from "@/components/forms/registerForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - OpenBayan",
  description: "Create a new account on OpenBayan",
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
          <h2>Let&apos;s get you registered!</h2>
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
