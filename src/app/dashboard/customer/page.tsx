
import Link from "next/link";

export default function CustomerDashboard() {
  return (
    <main className="min-h-screen bg-[#FFF9F0] px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-semibold text-[#D93625]">
          Customer Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-[#29211D]">
          Welcome to PizzaHub!
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your pizza orders and account.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Link
            href="/menu"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-bold">Browse Menu</h2>
            <p className="mt-2 text-gray-600">
              Explore delicious pizzas.
            </p>
          </Link>

          <Link
            href="/dashboard/customer/orders"
            className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="text-xl font-bold">My Orders</h2>
            <p className="mt-2 text-gray-600">
              Track your pizza orders.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
