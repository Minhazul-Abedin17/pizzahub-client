
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Pizza,
  CheckCircle,
  Clock,
  XCircle,
  Plus,
  ArrowRight,
  MapPin,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: string;
  status: string;
  isActive: boolean;
};

export default function VendorDashboard() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await authFetch(
          "/api/menu-items/my-items"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        setItems(Array.isArray(data) ? data : data.items || []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const totalItems = items.length;
  const approvedItems = items.filter(
    (item) => item.status === "approved"
  ).length;
  const pendingItems = items.filter(
    (item) => item.status === "pending"
  ).length;
  const rejectedItems = items.filter(
    (item) => item.status === "rejected"
  ).length;

  const stats = [
    {
      title: "Total Pizzas",
      value: totalItems,
      icon: Pizza,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Approved",
      value: approvedItems,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending",
      value: pendingItems,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Rejected",
      value: rejectedItems,
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-red-600">
            <LayoutDashboard size={17} />
            Vendor Dashboard
          </div>

          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your pizzas and keep track of your menu activity.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/menu/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <Plus size={18} />
          Add New Pizza
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={23} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/dashboard/vendor/menu/new"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:border-red-300 hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <Plus size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Add New Pizza
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add a new item to your menu.
                </p>
              </div>
            </div>

            <ArrowRight
              size={19}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-red-600"
            />
          </Link>

          <Link
            href="/dashboard/vendor/menu"
            className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition hover:border-red-300 hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <Pizza size={22} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Manage Menu
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  View and update your pizza listings.
                </p>
              </div>
            </div>

            <ArrowRight
              size={19}
              className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-red-600"
            />
          </Link>
        </div>
      </div>

      {/* Recent Pizzas */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
          <div>
            <h2 className="font-bold text-gray-900">
              Recent Pizza Listings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your recently added menu items.
            </p>
          </div>

          <Link
            href="/dashboard/vendor/menu"
            className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="p-10 text-center">
            <Pizza className="mx-auto mb-3 h-10 w-10 text-gray-300" />

            <h3 className="font-semibold text-gray-800">
              No Pizzas Yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Start by adding your first pizza.
            </p>

            <Link
              href="/dashboard/vendor/menu/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              <Plus size={16} />
              Add Pizza
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.slice(0, 5).map((item) => (
              <Link
                key={item._id}
                href={`/dashboard/vendor/menu/${item._id}`}
                className="flex flex-col gap-4 p-4 transition hover:bg-gray-50 sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-full rounded-lg object-cover sm:w-20"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={13} />
                    {item.location}
                  </p>
                </div>

                <p className="font-bold text-red-600">
                  ৳{item.price}
                </p>

                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {item.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
