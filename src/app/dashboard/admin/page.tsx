
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Store,
  UserRound,
  Pizza,
  Clock,
  CreditCard,
  ShoppingBag,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";
import { toast } from "react-toastify";

type DashboardStats = {
  totalUsers: number;
  totalCustomers: number;
  totalVendors: number;
  blockedUsers: number;
  totalMenuItems: number;
  pendingItems: number;
  approvedItems: number;
  rejectedItems: number;
  totalOrders: number;
  pendingOrders: number;
  totalTransactions: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        const response = await authFetch("/api/admin/dashboard");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        if (!ignore) setStats(data);
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

    loadDashboard();

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!stats) {
    return (
      <p className="py-10 text-center text-neutral-500">
        No dashboard data available.
      </p>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: UserRound,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Vendors",
      value: stats.totalVendors,
      icon: Store,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Total Menu Items",
      value: stats.totalMenuItems,
      icon: Pizza,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Pending Items",
      value: stats.pendingItems,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Transactions",
      value: stats.totalTransactions,
      icon: CreditCard,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Blocked Users",
      value: stats.blockedUsers,
      icon: Users,
      color: "bg-neutral-100 text-neutral-600",
    },
  ];

  const menuTotal =
    stats.approvedItems + stats.pendingItems + stats.rejectedItems;

  const getPercent = (value: number) =>
    menuTotal > 0 ? `${(value / menuTotal) * 100}%` : "0%";

  return (
    <section className="space-y-7">
      {/* Page Header */}
      <div>
        <p className="text-sm font-semibold text-red-600">ADMIN PANEL</p>

        <h1 className="mt-1 text-2xl font-bold text-neutral-900">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          Monitor users, menu items, orders, and platform activity.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">{card.title}</p>

                  <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                    {card.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${card.color}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard Bottom Sections */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Menu Status */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="font-bold text-neutral-900">Menu Item Status</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Overview of submitted menu items.
          </p>

          <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-neutral-100">
            <div
              className="bg-green-500"
              style={{ width: getPercent(stats.approvedItems) }}
            />

            <div
              className="bg-amber-400"
              style={{ width: getPercent(stats.pendingItems) }}
            />

            <div
              className="bg-red-500"
              style={{ width: getPercent(stats.rejectedItems) }}
            />
          </div>

          <div className="mt-5 space-y-3">
            {[
              {
                label: "Approved",
                value: stats.approvedItems,
                color: "bg-green-500",
              },
              {
                label: "Pending",
                value: stats.pendingItems,
                color: "bg-amber-400",
              },
              {
                label: "Rejected",
                value: stats.rejectedItems,
                color: "bg-red-500",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                  />
                  {item.label}
                </div>

                <span className="font-semibold text-neutral-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <h2 className="font-bold text-neutral-900">Quick Actions</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Manage your PizzaHub platform.
          </p>

          <div className="mt-5 space-y-3">
            {[
              {
                title: "Manage Users",
                href: "/dashboard/admin/users",
              },
              {
                title: "Review Menu Items",
                href: "/dashboard/admin/menu-items",
              },
              {
                title: "Manage Orders",
                href: "/dashboard/admin/orders",
              },
              {
                title: "View Transactions",
                href: "/dashboard/admin/transactions",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-xl border border-neutral-200 p-4 text-sm font-semibold text-neutral-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                {item.title}
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-orange-50 p-4">
            <p className="text-sm font-semibold text-orange-800">
              Pending Orders: {stats.pendingOrders}
            </p>

            <p className="mt-1 text-xs text-orange-700">
              Orders waiting for vendor review.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
