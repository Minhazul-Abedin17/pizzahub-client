
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Loader2,
  Pizza,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";
import { toast } from "react-toastify";

type Order = {
  _id: string;
  itemName: string;
  itemImage?: string;
  totalPrice: number;
  quantity: number;
  vendorEmail?: string;
  deliveryDate: string;
  status: string;
  createdAt: string;
};

export default function CustomerDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadOrders = async () => {
      try {
        const response = await authFetch("/api/orders/my-orders");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load orders");
        }

        if (!ignore) {
          setOrders(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(
            error instanceof Error ? error.message : "Something went wrong"
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadOrders();

    return () => {
      ignore = true;
    };
  }, []);

  const total = orders.length;
  const pending = orders.filter((order) => order.status === "pending").length;
  const accepted = orders.filter((order) => order.status === "accepted").length;
  const rejected = orders.filter((order) => order.status === "rejected").length;
  const cancelled = orders.filter(
    (order) => order.status === "cancelled"
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: total,
      icon: ShoppingBag,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Accepted",
      value: accepted,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "bg-red-50 text-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <section className="space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-red-600">CUSTOMER PANEL</p>
          <h1 className="mt-1 text-2xl font-bold text-neutral-900">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Track your pizza orders and their latest status.
          </p>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
        >
          <Pizza size={18} />
          Browse Menu
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">{stat.title}</p>
                  <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">
              Recent Orders
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Your latest order activity.
            </p>
          </div>

          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:underline"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl bg-orange-50 px-4 py-10 text-center">
            <Pizza className="mx-auto h-10 w-10 text-orange-400" />
            <h3 className="mt-3 font-semibold text-neutral-800">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              Explore our menu and place your first order.
            </p>
            <Link
              href="/menu"
              className="mt-4 inline-block rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex flex-col gap-3 rounded-xl border border-neutral-100 p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {order.itemImage ? (
                    <img
                      src={order.itemImage}
                      alt={order.itemName}
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-50">
                      <Pizza className="text-orange-400" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-neutral-800">
                      {order.itemName}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Quantity: {order.quantity} · ৳{order.totalPrice}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {order.vendorEmail || "Restaurant"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold capitalize text-neutral-700">
                    {order.status}
                  </span>

                  <Link
                    href={`/dashboard/customer/orders/${order._id}`}
                    className="text-sm font-semibold text-red-600 hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {cancelled > 0 && (
          <p className="mt-4 text-xs text-neutral-500">
            Cancelled orders: {cancelled}
          </p>
        )}
      </div>
    </section>
  );
}
