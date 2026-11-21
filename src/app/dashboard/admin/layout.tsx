import { requireRole } from "@/app/lib/require-role";

export const instant = false;
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["admin"]);

  return <>{children}</>;
}