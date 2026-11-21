
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  PackageCheck,
  ArrowRight,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";

type Order = {
  _id: string;
  itemName: string;
  itemImage: string;
  totalPrice: number;
  quantity: number;
  deliveryDate: string;
  status: "pending" | "accepted" | "rejected" | "cancelled" | "delivered";
  createdAt: string;
};

export default function CustomerDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authFetch("/api/orders/my-orders");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: Package,
      color: "text-neutral-700",
      bg: "bg-neutral-100",
    },
    {
      label: "Pending",
      value: orders.filter((o) => o.status === "pending").length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Accepted",
      value: orders.filter((o) => o.status === "accepted").length,
      icon: CheckCircle,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Rejected",
      value: orders.filter((o) => o.status === "rejected").length,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Delivered",
      value: orders.filter((o) => o.status === "delivered").length,
      icon: PackageCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  const recentOrders = orders.slice(0, 5);

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-[#29211D] p-6 text-white sm:p-8">
        <p className="text-sm font-semibold text-orange-300">
          CUSTOMER DASHBOARD
        </p>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
          Welcome to Your Dashboard!
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-300">
          Keep track of your pizza orders and enjoy fresh, delicious moments
          with PizzaHub.
        </p>
        <Link
          href="/menu"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <ShoppingBag size={17} />
          Explore Menu
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-neutral-500 sm:text-sm">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-neutral-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Recent Orders
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Your latest pizza orders.
            </p>
          </div>

          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="py-12 text-center">
            <Package className="mx-auto h-12 w-12 text-neutral-300" />
            <h3 className="mt-3 font-semibold text-neutral-800">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Browse our menu and place your first order.
            </p>
            <Link
              href="/menu"
              className="mt-4 inline-flex rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="mt-5 divide-y divide-neutral-100">
            {recentOrders.map((order) => (
              <div
                key={order._id}
                className="flex flex-wrap items-center justify-between gap-4 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={order.itemImage || "/placeholder-pizza.jpg"}
                    alt={order.itemName}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-neutral-900">
                      {order.itemName}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      Qty: {order.quantity} · ৳{order.totalPrice}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold capitalize text-neutral-700">
                    {order.status}
                  </span>
                  <Link
                    href={`/dashboard/customer/orders/${order._id}`}
                    aria-label={`View ${order.itemName} order`}
                    className="rounded-lg border p-2 text-neutral-600 hover:bg-neutral-50"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/customer/orders"
          className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-red-200 hover:shadow-sm"
        >
          <Package className="text-red-600" size={24} />
          <h3 className="mt-3 font-bold text-neutral-900">My Orders</h3>
          <p className="mt-1 text-sm text-neutral-500">
            View and track all your orders.
          </p>
        </Link>

        <Link
          href="/dashboard/customer/profile"
          className="rounded-xl border border-neutral-200 bg-white p-5 transition hover:border-red-200 hover:shadow-sm"
        >
          <CheckCircle className="text-red-600" size={24} />
          <h3 className="mt-3 font-bold text-neutral-900">Profile Settings</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your account information.
          </p>
        </Link>
      </div>
    </section>
  );
}
