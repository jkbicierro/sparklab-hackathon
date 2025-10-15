import { LoginForm } from "@/components/forms/loginForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
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
