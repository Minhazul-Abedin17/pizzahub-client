import { requireRole } from "@/app/lib/require-role";

export const instant = false;


export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["customer"]);

  return <>{children}</>;
}