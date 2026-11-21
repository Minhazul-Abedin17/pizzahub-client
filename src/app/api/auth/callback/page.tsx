
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/lib/auth-client";

type UserWithRole = {
  role?: "customer" | "vendor" | "admin";
};

export default function AuthCallbackPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;

    if (!session?.user) {
      router.replace("/sign-in");
      return;
    }

    const user = session.user as typeof session.user & UserWithRole;

    if (user.role === "admin") {
      router.replace("/dashboard/admin");
    } else if (user.role === "vendor") {
      router.replace("/dashboard/vendor");
    } else {
      router.replace("/dashboard/customer");
    }
  }, [session, isPending, router]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-sm font-medium text-gray-600">
        Signing you in...
      </p>
    </div>
  );
}
