
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

type UserRole = "customer" | "vendor" | "admin";

export const requireRole = async (allowedRoles: UserRole[]) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user as typeof session.user & {
    role?: UserRole;
  };

  if (!user.role || !allowedRoles.includes(user.role)) {
    redirect("/");
  }

  return session;
};
