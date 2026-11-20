import { requireRole } from "@/app/lib/require-role";

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["vendor"]);

  return <>{children}</>;
}
