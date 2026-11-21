
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
  MapPin,
  CalendarDays,
  Eye,
  Trash2,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";

type Order = {
  _id: string;
  itemName: string;
  itemImage: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  vendorEmail: string;
  deliveryDate: string;
  deliveryAddress: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "cancelled" | "delivered";
  createdAt: string;
};

type FilterType = "all" | "pending" | "accepted" | "rejected" | "cancelled" | "delivered";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  // Fetch customer orders
  const fetchOrders = async (refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await authFetch("/api/orders/my-orders");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load orders");
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not load orders"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Cancel pending order
  const handleCancelOrder = async () => {
    if (!selectedOrder) return;

    try {
      setCancelling(true);

      const response = await authFetch(
        `/api/orders/${selectedOrder._id}/cancel`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel order");
      }

      setOrders((previous) =>
        previous.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: "cancelled" }
            : order
        )
      );

      setSelectedOrder(null);
      toast.success(data.message || "Order cancelled successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setCancelling(false);
    }
  };

  // Order counts
  const counts = {
    all: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    accepted: orders.filter((order) => order.status === "accepted").length,
    rejected: orders.filter((order) => order.status === "rejected").length,
    cancelled: orders.filter((order) => order.status === "cancelled").length,
    delivered: orders.filter((order) => order.status === "delivered").length,
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  // Status styles
  const getStatusStyle = (status: Order["status"]) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      accepted: "bg-blue-50 text-blue-700 border-blue-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
      cancelled: "bg-neutral-100 text-neutral-600 border-neutral-200",
      delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };

    return styles[status];
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        <p className="text-sm text-neutral-500">Loading your orders...</p>
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen w-full bg-[#FFF9F0]/40">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                <Package size={14} />
                Customer Dashboard
              </span>

              <h1 className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl">
                My Orders
              </h1>

              <p className="mt-1 text-sm text-neutral-500">
                Track and manage all your pizza orders.
              </p>
            </div>

            <button
              type="button"
              onClick={() => fetchOrders(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[
              {
                label: "Total Orders",
                value: counts.all,
                icon: Package,
                color: "text-neutral-700",
                bg: "bg-neutral-100",
              },
              {
                label: "Pending",
                value: counts.pending,
                icon: Clock,
                color: "text-amber-600",
                bg: "bg-amber-50",
              },
              {
                label: "Accepted",
                value: counts.accepted,
                icon: CheckCircle,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                label: "Rejected",
                value: counts.rejected,
                icon: XCircle,
                color: "text-red-600",
                bg: "bg-red-50",
              },
              {
                label: "Delivered",
                value: counts.delivered,
                icon: PackageCheck,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
            ].map((stat) => {
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
                      <h2 className="mt-2 text-2xl font-bold text-neutral-900">
                        {stat.value}
                      </h2>
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

          {/* Filters */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 font-semibold text-neutral-800">
              Filter Orders
            </h2>

            <div className="flex flex-wrap gap-2">
              {(
                ["all", "pending", "accepted", "rejected", "cancelled", "delivered"] as FilterType[]
              ).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                    filter === status
                      ? "bg-red-600 text-white"
                      : "border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {status} ({counts[status]})
                </button>
              ))}
            </div>
          </div>

          {/* Orders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900">
                Order History
              </h2>

              <span className="text-sm text-neutral-500">
                {filteredOrders.length} orders
              </span>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-5 py-16 text-center">
                <Package className="mx-auto h-12 w-12 text-neutral-300" />

                <h3 className="mt-4 text-lg font-bold text-neutral-900">
                  No Orders Found
                </h3>

                <p className="mt-2 text-sm text-neutral-500">
                  {filter === "all"
                    ? "You haven't placed any orders yet."
                    : `You don't have any ${filter} orders.`}
                </p>

                {filter !== "all" && (
                  <button
                    type="button"
                    onClick={() => setFilter("all")}
                    className="mt-4 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    View All Orders
                  </button>
                )}
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">

                    {/* Pizza Image */}
                    <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-32 sm:w-36">
                      <img
                        src={order.itemImage || "/placeholder-pizza.jpg"}
                        alt={order.itemName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Order Information */}
                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                            Pizza Order
                          </p>

                          <h3 className="mt-1 text-lg font-bold text-neutral-900">
                            {order.itemName}
                          </h3>
                        </div>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
                        <span>
                          Quantity:{" "}
                          <strong className="text-neutral-800">
                            {order.quantity}
                          </strong>
                        </span>

                        <span>
                          Total:{" "}
                          <strong className="text-red-600">
                            ৳{order.totalPrice}
                          </strong>
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-neutral-500">
                        <p className="flex items-center gap-2">
                          <CalendarDays size={15} className="text-red-500" />
                          Delivery:{" "}
                          {new Date(order.deliveryDate).toLocaleDateString()}
                        </p>

                        <p className="flex items-center gap-2 break-all">
                          <MapPin size={15} className="shrink-0 text-red-500" />
                          {order.deliveryAddress}
                        </p>

                        <p className="text-xs">
                          Ordered on:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {order.vendorEmail && (
                        <p className="text-sm text-neutral-500">
                          Vendor: {order.vendorEmail}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-3">
                        <Link
                          href={`/dashboard/customer/orders/${order._id}`}
                          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
                        >
                          <Eye size={16} />
                          View Details
                        </Link>

                        {order.status === "pending" && (
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                          >
                            <Trash2 size={16} />
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Cancel Confirmation Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          onClick={() => {
            if (!cancelling) setSelectedOrder(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-title"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>

            <div className="mt-5 text-center">
              <h2
                id="cancel-title"
                className="text-xl font-bold text-neutral-900"
              >
                Cancel This Order?
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Are you sure you want to cancel your order for{" "}
                <strong className="text-neutral-800">
                  {selectedOrder.itemName}
                </strong>
                ?
              </p>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                disabled={cancelling}
                onClick={() => setSelectedOrder(null)}
                className="flex-1 rounded-xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                Keep Order
              </button>

              <button
                type="button"
                disabled={cancelling}
                onClick={handleCancelOrder}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {cancelling ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Yes, Cancel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
