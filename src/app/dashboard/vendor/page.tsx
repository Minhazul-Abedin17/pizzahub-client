
import Link from "next/link";

export default function VendorDashboard() {
  return (
    <main className="min-h-screen bg-[#FFF9F0] px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-[#D93625]">
          Vendor Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#29211D]">
          Manage Your Pizza Business
        </h1>

        <p className="mt-2 text-gray-600">
          Add pizzas and manage your menu.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Link
            href="/dashboard/vendor/menu/new"
            className="rounded-xl bg-[#D93625] p-6 text-white transition hover:bg-[#b92c1e]"
          >
            <h2 className="text-xl font-bold">Add New Pizza</h2>
            <p className="mt-2 text-white/80">
              Create a new menu item.
            </p>
          </Link>

          <Link
            href="/dashboard/vendor/menu"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-bold">Manage Menu</h2>
            <p className="mt-2 text-gray-600">
              View and manage your pizzas.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
