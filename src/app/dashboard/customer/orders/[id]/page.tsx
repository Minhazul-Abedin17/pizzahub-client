
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  PackageCheck,
  MapPin,
  CalendarDays,
  Loader2,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
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
  vendorEmail: string;
  deliveryDate: string;
  deliveryAddress: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "cancelled" | "delivered";
  createdAt: string;
};

export default function CustomerOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await authFetch(`/api/orders/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Order not found");
        }

        setOrder(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Could not load order"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const cancelOrder = async () => {
    if (!order) return;

    try {
      setCancelling(true);

      const response = await authFetch(`/api/orders/${id}/cancel`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not cancel order");
      }

      setOrder({ ...order, status: "cancelled" });
      setShowCancelModal(false);
      toast.success(data.message || "Order cancelled successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setCancelling(false);
    }
  };

  const timeline = [
    {
      status: "pending",
      title: "Order Placed",
      description: "Your order has been submitted.",
      icon: Clock,
    },
    {
      status: "accepted",
      title: "Order Accepted",
      description: "The vendor has accepted your order.",
      icon: CheckCircle,
    },
    {
      status: "delivered",
      title: "Order Delivered",
      description: "Your order has been delivered.",
      icon: PackageCheck,
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border bg-white p-8 text-center">
        <Package className="mx-auto h-12 w-12 text-neutral-300" />
        <h2 className="mt-4 text-xl font-bold text-neutral-900">
          Order Not Found
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          This order does not exist or does not belong to your account.
        </p>
        <Link
          href="/dashboard/customer/orders"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
        >
          <ArrowLeft size={16} />
          Back to My Orders
        </Link>
      </div>
    );
  }

  const currentStep =
    order.status === "delivered"
      ? 2
      : order.status === "accepted"
      ? 1
      : 0;

  const isCancelled = order.status === "cancelled";
  const isRejected = order.status === "rejected";

  return (
    <>
      <section className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <Link
            href="/dashboard/customer/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-red-600"
          >
            <ArrowLeft size={16} />
            Back to My Orders
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-neutral-900">
            Order Details
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Review your order and track its progress.
          </p>
        </div>

        {/* Order Status */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Order ID
              </p>
              <p className="mt-1 break-all text-sm font-semibold text-neutral-800">
                {order._id}
              </p>
            </div>

            <span className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold capitalize text-neutral-700">
              {order.status}
            </span>
          </div>

          <div className="mt-7">
            <h2 className="font-bold text-neutral-900">Order Progress</h2>

            {isCancelled || isRejected ? (
              <div
                className={`mt-4 rounded-xl p-4 ${
                  isCancelled
                    ? "bg-neutral-100 text-neutral-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <XCircle size={22} />
                  <div>
                    <p className="font-semibold">
                      {isCancelled ? "Order Cancelled" : "Order Rejected"}
                    </p>
                    <p className="mt-1 text-sm">
                      {isCancelled
                        ? "This order was cancelled."
                        : "The vendor could not accept this order."}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {timeline.map((step, index) => {
                  const Icon = step.icon;
                  const completed = index <= currentStep;

                  return (
                    <div key={step.status} className="flex gap-3 sm:block">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                          completed
                            ? "bg-red-600 text-white"
                            : "bg-neutral-100 text-neutral-400"
                        }`}
                      >
                        <Icon size={21} />
                      </div>

                      <div className="sm:mt-3">
                        <p
                          className={`font-semibold ${
                            completed
                              ? "text-neutral-900"
                              : "text-neutral-400"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Pizza Information */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="grid md:grid-cols-[220px_1fr]">
            <img
              src={order.itemImage || "/placeholder-pizza.jpg"}
              alt={order.itemName}
              className="h-52 w-full object-cover md:h-full"
            />

            <div className="space-y-3 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-600">
                Ordered Pizza
              </p>

              <h2 className="text-xl font-bold text-neutral-900">
                {order.itemName}
              </h2>

              <div className="flex flex-wrap gap-5 text-sm text-neutral-500">
                <p>Quantity: {order.quantity}</p>
                <p>Unit Price: ৳{order.unitPrice}</p>
              </div>

              <div className="border-t border-neutral-100 pt-4">
                <p className="text-sm text-neutral-500">Total Amount</p>
                <p className="mt-1 text-2xl font-bold text-red-600">
                  ৳{order.totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="font-bold text-neutral-900">
              Delivery Information
            </h2>

            <div className="mt-4 space-y-4 text-sm">
              <div className="flex gap-3">
                <CalendarDays className="shrink-0 text-red-600" size={19} />
                <div>
                  <p className="text-neutral-500">Delivery Date</p>
                  <p className="mt-1 font-semibold text-neutral-800">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="shrink-0 text-red-600" size={19} />
                <div>
                  <p className="text-neutral-500">Delivery Address</p>
                  <p className="mt-1 font-semibold text-neutral-800">
                    {order.deliveryAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5">
            <h2 className="font-bold text-neutral-900">
              Order Information
            </h2>

            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="text-neutral-500">Vendor Email</p>
                <p className="mt-1 break-all font-semibold text-neutral-800">
                  {order.vendorEmail || "Not available"}
                </p>
              </div>

              <div>
                <p className="text-neutral-500">Request Date</p>
                <p className="mt-1 font-semibold text-neutral-800">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-neutral-500">Special Instructions</p>
                <p className="mt-1 font-semibold text-neutral-800">
                  {order.message || "No additional message"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Action */}
        {order.status === "pending" && (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-100 bg-red-50 p-5">
            <div>
              <h3 className="font-bold text-neutral-900">
                Need to cancel this order?
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                You can cancel an order while it is still pending.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              <Trash2 size={16} />
              Cancel Order
            </button>
          </div>
        )}
      </section>

      {/* Cancel Confirmation */}
      {showCancelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!cancelling) setShowCancelModal(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="text-red-600" size={28} />
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-neutral-900">
              Cancel This Order?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-neutral-500">
              Are you sure you want to cancel your order for {order.itemName}?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                disabled={cancelling}
                onClick={() => setShowCancelModal(false)}
                className="flex-1 rounded-xl border px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                Keep Order
              </button>

              <button
                type="button"
                disabled={cancelling}
                onClick={cancelOrder}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {cancelling ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Cancelling...
                  </span>
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
