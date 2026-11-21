
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Pencil,
  Pizza,
  Loader2,
  CheckCircle,
  Clock,
  XCircle,
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
  isFeatured: boolean;
};

export default function VendorPizzaDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);

        const response = await authFetch(
          `/api/menu-items/my-items/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Pizza not found");
        }

        setItem(data.item || data);
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

    fetchPizza();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        <Pizza className="mx-auto mb-3 h-12 w-12 text-gray-400" />

        <h2 className="text-xl font-bold text-gray-900">
          Pizza Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {error || "This pizza could not be found."}
        </p>

        <Link
          href="/dashboard/vendor/menu"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          <ArrowLeft size={16} />
          Back to Manage Menu
        </Link>
      </div>
    );
  }

  const statusStyle =
    item.status === "approved"
      ? "bg-green-100 text-green-700"
      : item.status === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-amber-100 text-amber-700";

  const StatusIcon =
    item.status === "approved"
      ? CheckCircle
      : item.status === "rejected"
      ? XCircle
      : Clock;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard/vendor/menu"
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-red-600"
          >
            <ArrowLeft size={16} />
            Back to Manage Menu
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            Pizza Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage your pizza information.
          </p>
        </div>

        <Link
          href={`/dashboard/vendor/menu/${id}/edit`}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <Pencil size={16} />
          Edit Pizza
        </Link>
      </div>

      {/* Details */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="min-h-[280px] bg-gray-100">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-full min-h-[280px] w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[280px] items-center justify-center">
                <Pizza size={60} className="text-gray-300" />
              </div>
            )}
          </div>

          {/* Information */}
          <div className="space-y-5 p-6 md:p-8">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyle}`}
                >
                  <StatusIcon size={14} />
                  {item.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                {item.name}
              </h2>

              <p className="mt-2 text-2xl font-bold text-red-600">
                ৳{item.price}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-2 font-semibold text-gray-900">
                Description
              </h3>

              <p className="text-sm leading-7 text-gray-600">
                {item.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="mt-1 font-semibold capitalize text-gray-800">
                  {item.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="mt-1 flex items-center gap-1 font-semibold text-gray-800">
                  <MapPin size={15} />
                  {item.location}
                </p>
              </div>
            </div>

            {item.isFeatured && (
              <div className="rounded-lg bg-amber-50 p-3 text-sm font-medium text-amber-700">
                This pizza is featured on PizzaHub.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approval Information */}
      {item.status === "pending" && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="font-semibold text-amber-800">
            Your pizza is waiting for approval.
          </p>
          <p className="mt-1 text-sm text-amber-700">
            Admin approval is required before customers can order this pizza.
          </p>
        </div>
      )}

      {item.status === "rejected" && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="font-semibold text-red-800">
            Your pizza was rejected.
          </p>
          <p className="mt-1 text-sm text-red-700">
            You can edit the information and submit it again for approval.
          </p>
        </div>
      )}
    </div>
  );
}
