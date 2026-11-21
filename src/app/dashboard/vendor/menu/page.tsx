"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Pizza,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  MapPin,
  ArrowUpRight,
  Search,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/app/lib/auth-fetch";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: string;
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
};

export default function ManageMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const response = await authFetch("/api/menu-items/my-items");

        if (!response.ok) {
          throw new Error("Failed to load menu items");
        }

        const data = await response.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Could not load your menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, []);

  const pendingCount = items.filter((item) => item.status === "pending").length;
  const approvedCount = items.filter((item) => item.status === "approved").length;
  const rejectedCount = items.filter((item) => item.status === "rejected").length;

  const filteredItems = items.filter((item) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query);

    const matchesFilter =
      activeFilter === "all" || item.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: MenuItem["status"]) => {
    switch (status) {
      case "approved":
        return {
          classes: "bg-emerald-500/95 text-white ring-1 ring-emerald-400/40",
          label: "Approved",
        };
      case "rejected":
        return {
          classes: "bg-rose-600/95 text-white ring-1 ring-rose-400/40",
          label: "Rejected",
        };
      default:
        return {
          classes: "bg-amber-500/95 text-white ring-1 ring-amber-300/40",
          label: "Pending",
        };
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[65vh] w-full flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-red-600" />
        <p className="text-sm font-medium text-neutral-500">
          Loading your menu items...
        </p>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Pizzas",
      value: items.length,
      icon: Pizza,
      valueClass: "text-neutral-900",
      iconBg: "bg-red-50 text-red-600 ring-1 ring-red-100",
      cardBorder: "hover:border-red-200",
    },
    {
      label: "Approved",
      value: approvedCount,
      icon: CheckCircle,
      valueClass: "text-emerald-600",
      iconBg: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
      cardBorder: "hover:border-emerald-200",
    },
    {
      label: "Pending Review",
      value: pendingCount,
      icon: Clock,
      valueClass: "text-amber-600",
      iconBg: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
      cardBorder: "hover:border-amber-200",
    },
    {
      label: "Rejected",
      value: rejectedCount,
      icon: XCircle,
      valueClass: "text-rose-600",
      iconBg: "bg-rose-50 text-rose-600 ring-1 ring-rose-100",
      cardBorder: "hover:border-rose-200",
    },
  ];

  return (
    <section className="w-full min-w-0">
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-gradient-to-br from-white via-white to-red-50/40 p-5 shadow-xs sm:flex-row sm:items-center">
          <div className="min-w-0 space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 ring-1 ring-red-100">
              <Sparkles className="h-3.5 w-3.5" />
              Vendor Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Manage Menu
            </h1>

            <p className="max-w-2xl text-sm text-neutral-500">
              Manage pricing, availability, and approval status for all your
              pizza listings in one place.
            </p>
          </div>

          <Link
            href="/dashboard/vendor/menu/new"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-red-600/20 transition hover:bg-red-700 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Add New Pizza
          </Link>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className={`rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-2xs transition duration-200 ${stat.cardBorder}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                      {stat.label}
                    </p>
                    <h2
                      className={`mt-1.5 text-2xl font-bold tabular-nums ${stat.valueClass}`}
                    >
                      {stat.value}
                    </h2>
                  </div>

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search & Status Filter Bar */}
        <div className="rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-2xs">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by pizza name, category, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 py-2 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/15"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "All", value: "all", count: items.length },
                { label: "Approved", value: "approved", count: approvedCount },
                { label: "Pending", value: "pending", count: pendingCount },
                { label: "Rejected", value: "rejected", count: rejectedCount },
              ].map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setActiveFilter(filter.value)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
                      isActive
                        ? "bg-red-600 text-white shadow-xs shadow-red-600/20"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900"
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[11px] tabular-nums ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-white text-neutral-600"
                      }`}
                    >
                      {filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-neutral-900">
              Your Pizza Listings
            </h2>
            <p className="text-xs text-neutral-500 tabular-nums sm:text-sm">
              Showing {filteredItems.length} of {items.length}{" "}
              {items.length === 1 ? "item" : "items"}
            </p>
          </div>

          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-14 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                <Pizza className="h-6 w-6" />
              </div>

              <h3 className="text-base font-semibold text-neutral-900">
                No pizzas found
              </h3>

              <p className="mx-auto mt-1 max-w-md text-xs text-neutral-500 sm:text-sm">
                {items.length === 0
                  ? "You haven't added any pizzas to your menu yet. Create your first listing to get started."
                  : "No listings match your current search or filter selection."}
              </p>

              {items.length === 0 ? (
                <Link
                  href="/dashboard/vendor/menu/new"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Your First Pizza
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("all");
                  }}
                  className="mt-5 inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  Reset Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => {
                const badge = getStatusBadge(item.status);

                return (
                  <Link
                    key={item._id}
                    href={`/dashboard/vendor/menu/${item._id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200/90 bg-white shadow-2xs transition duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:shadow-lg hover:shadow-neutral-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  >
                    {/* Image Container */}
                    <div className="relative h-40 w-full overflow-hidden bg-neutral-100">
                      <Image
                        src={item.image || "/placeholder-pizza.jpg"}
                        alt={item.name}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-2.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold backdrop-blur-xs ${
                            item.isActive
                              ? "bg-neutral-950/75 text-white"
                              : "bg-neutral-900/60 text-neutral-200"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.isActive ? "bg-emerald-400" : "bg-neutral-400"
                            }`}
                          />
                          {item.isActive ? "Active" : "Inactive"}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold shadow-xs ${badge.classes}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col justify-between space-y-3 p-4">
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-red-600">
                              {item.category}
                            </p>
                            <h3 className="mt-0.5 line-clamp-1 text-base font-bold text-neutral-900 transition group-hover:text-red-600">
                              {item.name}
                            </h3>
                          </div>

                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500 transition group-hover:bg-red-50 group-hover:text-red-600">
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </span>
                        </div>

                        <p className="line-clamp-2 min-h-[2.25rem] text-xs leading-4 text-neutral-500">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 border-t border-neutral-100 pt-3">
                        <p className="text-lg font-bold tabular-nums text-neutral-900">
                          ৳{Number(item.price).toLocaleString()}
                        </p>

                        <div className="flex items-center gap-1 text-xs font-medium text-neutral-500">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                          <span className="max-w-[115px] truncate">
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}