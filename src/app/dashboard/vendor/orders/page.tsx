
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle,
  XCircle,
  PackageCheck,
  Loader2,
  MapPin,
  CalendarDays,
  RefreshCw,
  ShoppingBag,
  UserRound,
  MessageSquare,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";

type Order = {
  _id: string;
  itemName: string;
  itemImage: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  deliveryDate: string;
  deliveryAddress: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "cancelled" | "delivered";
  createdAt: string;
};

type FilterType = "all" | "pending" | "accepted" | "rejected" | "delivered";

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  // Fetch vendor orders
  const fetchOrders = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await authFetch("/api/vendor/orders");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load orders");
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not load orders"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const updateOrderStatus = async (
    id: string,
    status: "accepted" | "rejected" | "delivered"
  ) => {
    try {
      setUpdatingId(id);

      const response = await authFetch(
        `/api/vendor/orders/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order");
      }

      setOrders((previous) =>
        previous.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );

      toast.success(data.message || "Order updated successfully");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setUpdatingId("");
    }
  };

  // Order statistics
  const counts = {
    all: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    accepted: orders.filter((order) => order.status === "accepted").length,
    rejected: orders.filter((order) => order.status === "rejected").length,
    delivered: orders.filter((order) => order.status === "delivered").length,
  };

  // Filter orders
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  // Status badge styles
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

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <Loader2 className="h-9 w-9 animate-spin text-red-600" />
        <p className="text-sm font-medium text-neutral-500">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen w-full bg-[#FFF9F0]/40">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              <ShoppingBag size={14} />
              Vendor Dashboard
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Customer Orders
            </h1>

            <p className="mt-1 text-sm text-neutral-500">
              Manage and track orders received for your pizzas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            {refreshing ? "Refreshing..." : "Refresh Orders"}
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-800">
              Filter Orders
            </h2>
            <span className="text-xs text-neutral-500">
              {filteredOrders.length} orders found
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              ["all", "pending", "accepted", "rejected", "delivered"] as FilterType[]
            ).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                  filter === status
                    ? "bg-red-600 text-white shadow-sm"
                    : "border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {status}
                <span className="ml-2 text-xs opacity-80">
                  {counts[status]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-neutral-900">
              Your Orders
            </h2>

            <span className="text-xs text-neutral-500 sm:text-sm">
              Showing {filteredOrders.length} of {orders.length}
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <PackageCheck size={28} />
              </div>

              <h3 className="mt-4 text-lg font-bold text-neutral-900">
                No Orders Found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500">
                {filter === "all"
                  ? "You haven't received any customer orders yet."
                  : `There are no ${filter} orders at the moment.`}
              </p>

              {filter !== "all" && (
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
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
                <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row">

                  {/* Pizza Image */}
                  <div className="h-44 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-36 sm:w-40">
                    <img
                      src={order.itemImage || "/placeholder-pizza.jpg"}
                      alt={order.itemName || "Pizza"}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Order Information */}
                  <div className="min-w-0 flex-1 space-y-3">

                    {/* Title and Status */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                          Pizza Order
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-neutral-900">
                          {order.itemName || "Pizza"}
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

                    {/* Customer Information */}
                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-600">
                      <span className="inline-flex items-center gap-2">
                        <UserRound size={15} className="text-neutral-400" />
                        {order.customerName || "Customer"}
                      </span>

                      <span className="break-all text-neutral-500">
                        {order.customerEmail}
                      </span>
                    </div>

                    {/* Price Information */}
                    <div className="flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-3 text-sm">
                      <span className="text-neutral-500">
                        Quantity: <strong className="text-neutral-800">{order.quantity}</strong>
                      </span>

                      <span className="text-neutral-500">
                        Unit Price: <strong className="text-neutral-800">৳{order.unitPrice}</strong>
                      </span>

                      <span className="text-neutral-900">
                        Total:{" "}
                        <strong className="text-lg font-bold text-red-600">
                          ৳{order.totalPrice}
                        </strong>
                      </span>
                    </div>

                    {/* Delivery Information */}
                    <div className="grid grid-cols-1 gap-2 text-sm text-neutral-500 sm:grid-cols-2">
                      <p className="flex items-start gap-2">
                        <CalendarDays
                          size={15}
                          className="mt-0.5 shrink-0 text-red-500"
                        />
                        <span>
                          Delivery:{" "}
                          {order.deliveryDate
                            ? new Date(order.deliveryDate).toLocaleDateString()
                            : "Not specified"}
                        </span>
                      </p>

                      <p className="flex items-start gap-2">
                        <MapPin
                          size={15}
                          className="mt-0.5 shrink-0 text-red-500"
                        />
                        <span>{order.deliveryAddress || "Address not provided"}</span>
                      </p>
                    </div>

                    {/* Customer Message */}
                    {order.message && (
                      <p className="flex items-start gap-2 rounded-lg bg-neutral-50 p-3 text-sm text-neutral-600">
                        <MessageSquare
                          size={15}
                          className="mt-0.5 shrink-0 text-neutral-400"
                        />
                        {order.message}
                      </p>
                    )}

                    {/* Action Buttons */}
                    {order.status === "pending" && (
                      <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-3">
                        <button
                          type="button"
                          disabled={updatingId === order._id}
                          onClick={() =>
                            updateOrderStatus(order._id, "accepted")
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingId === order._id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <CheckCircle size={16} />
                          )}
                          Accept Order
                        </button>

                        <button
                          type="button"
                          disabled={updatingId === order._id}
                          onClick={() =>
                            updateOrderStatus(order._id, "rejected")
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <XCircle size={16} />
                          Reject Order
                        </button>
                      </div>
                    )}

                    {/* Mark Delivered */}
                    {order.status === "accepted" && (
                      <div className="border-t border-neutral-100 pt-3">
                        <button
                          type="button"
                          disabled={updatingId === order._id}
                          onClick={() =>
                            updateOrderStatus(order._id, "delivered")
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                          {updatingId === order._id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <PackageCheck size={16} />
                          )}
                          Mark as Delivered
                        </button>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
