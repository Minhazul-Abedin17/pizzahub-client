
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

type UserRole = "customer" | "vendor" | "admin";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  // Better Auth-এর existing role type-এর সঙ্গে conflict এড়ানো
  const user = session.user as unknown as {
    role?: UserRole;
  };

  if (user.role === "admin") {
    redirect("/dashboard/admin");
  }

  if (user.role === "vendor") {
    redirect("/dashboard/vendor");
  }

  if (user.role === "customer") {
    redirect("/dashboard/customer");
  }

  redirect("/");
}
