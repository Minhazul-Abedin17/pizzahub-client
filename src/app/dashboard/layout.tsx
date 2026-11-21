import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/app/lib/auth";
import {
  LayoutDashboard,
  Pizza,
  PlusCircle,
  ShoppingBag,
  Users,
  ClipboardList,
  Settings,
  CreditCard,
  Store,
} from "lucide-react";
export const instant = false;

type UserRole = "customer" | "vendor" | "admin";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user as typeof session.user & {
    role?: UserRole;
  };

  const role = user.role;

  if (!role) {
    redirect("/");
  }

  const menuItems = {
    customer: [
      { label: "Dashboard", href: "/dashboard/customer", icon: LayoutDashboard },
      { label: "Browse Menu", href: "/menu", icon: Pizza },
      { label: "My Orders", href: "/dashboard/customer/orders", icon: ShoppingBag },
      { label: "Settings", href: "/dashboard/customer/profile", icon: Settings },
    ],
    vendor: [
      { label: "Dashboard", href: "/dashboard/vendor", icon: LayoutDashboard },
      { label: "Add New Pizza", href: "/dashboard/vendor/menu/new", icon: PlusCircle },
      { label: "Manage Menu", href: "/dashboard/vendor/menu", icon: Pizza },
      { label: "Orders", href: "/dashboard/vendor/orders", icon: ClipboardList },
      { label: "Subscription", href: "/dashboard/vendor/subscription", icon: CreditCard },
      { label: "Settings", href: "/dashboard/vendor/profile", icon: Settings },
    ],
    admin: [
      { label: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      { label: "Manage Menu", href: "/dashboard/admin/menu", icon: Pizza },
      { label: "Manage Orders", href: "/dashboard/admin/orders", icon: ClipboardList },
      { label: "Transactions", href: "/dashboard/admin/transactions", icon: CreditCard },
      { label: "Settings", href: "/dashboard/admin/profile", icon: Settings },
    ],
  };

  const currentMenu = menuItems[role];

  return (
    <div className="min-h-screen bg-[#FFF9F0] md:flex">
      {/* Sidebar */}
      <aside className="w-full border-b border-neutral-200 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <Link href="/" className="flex items-center gap-2">
          <Store className="h-7 w-7 text-[#D93625]" />
          <span className="text-xl font-bold text-[#29211D]">
            PizzaHub
          </span>
        </Link>

        <div className="mt-8 rounded-xl bg-[#FFF4EC] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Signed in as
          </p>
          <p className="mt-1 truncate font-semibold text-[#29211D]">
            {session.user.name || session.user.email}
          </p>
          <span className="mt-2 inline-block rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-[#D93625]">
            {role}
          </span>
        </div>

        <nav className="mt-6 flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible">
          {currentMenu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-neutral-600 transition hover:bg-[#FFF0E8] hover:text-[#D93625]"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="mt-5 hidden rounded-lg border border-neutral-200 px-3 py-3 text-center text-sm font-medium text-neutral-600 transition hover:bg-neutral-50 md:block"
        >
          Back to Website
        </Link>
      </aside>

      {/* Dashboard Content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}