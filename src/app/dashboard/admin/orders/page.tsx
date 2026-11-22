
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  ShoppingBag,
  Loader2,
  Eye,
  X,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";
import { toast } from "react-toastify";

type Order = {
  _id: string;
  itemName: string;
  itemImage?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customerName?: string;
  customerEmail?: string;
  vendorEmail?: string;
  deliveryDate?: string;
  deliveryAddress?: string;
  message?: string;
  status: string;
  createdAt?: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    let ignore = false;

    const loadOrders = async () => {
      try {
        setLoading(true);

        const response = await authFetch("/api/admin/orders");
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
            error instanceof Error
              ? error.message
              : "Failed to load orders"
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

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.itemName?.toLowerCase().includes(searchText) ||
      order.customerName?.toLowerCase().includes(searchText) ||
      order.customerEmail?.toLowerCase().includes(searchText) ||
      order.vendorEmail?.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "all" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (value: string) => {
    switch (value) {
      case "accepted":
        return "bg-green-50 text-green-700";
      case "delivered":
        return "bg-blue-50 text-blue-700";
      case "rejected":
        return "bg-red-50 text-red-700";
      case "cancelled":
        return "bg-neutral-100 text-neutral-600";
      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-red-600">ADMIN PANEL</p>
        <h1 className="mt-1 text-2xl font-bold text-neutral-900">
          Manage Orders
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          View and monitor all customer orders.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search pizza, customer or email..."
              className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-red-500"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <p className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
          <ShoppingBag size={17} />
          {filteredOrders.length} orders found
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 text-center text-sm text-neutral-500">
            No orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="px-5 py-4">Pizza</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Quantity</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-neutral-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {order.itemImage ? (
                          <img
                            src={order.itemImage}
                            alt={order.itemName}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-lg bg-orange-50" />
                        )}

                        <span className="font-semibold text-neutral-800">
                          {order.itemName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-neutral-800">
                        {order.customerName || "Customer"}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {order.customerEmail || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-neutral-600">
                      {order.quantity}
                    </td>

                    <td className="px-5 py-4 font-semibold text-neutral-800">
                      ৳{order.totalPrice}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 hover:bg-orange-100"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">
                Order Details
              </h2>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100"
                aria-label="Close order details"
              >
                <X size={20} />
              </button>
            </div>

            {selectedOrder.itemImage && (
              <img
                src={selectedOrder.itemImage}
                alt={selectedOrder.itemName}
                className="mt-5 h-44 w-full rounded-xl object-cover"
              />
            )}

            <h3 className="mt-4 text-lg font-bold text-neutral-900">
              {selectedOrder.itemName}
            </h3>

            <div className="mt-5 space-y-4">
              {[
                ["Customer", selectedOrder.customerName || "—"],
                ["Customer Email", selectedOrder.customerEmail || "—"],
                ["Vendor Email", selectedOrder.vendorEmail || "—"],
                ["Quantity", String(selectedOrder.quantity)],
                ["Unit Price", `৳${selectedOrder.unitPrice}`],
                ["Total Price", `৳${selectedOrder.totalPrice}`],
                [
                  "Delivery Date",
                  selectedOrder.deliveryDate
                    ? new Date(selectedOrder.deliveryDate).toLocaleDateString()
                    : "—",
                ],
                ["Delivery Address", selectedOrder.deliveryAddress || "—"],
                ["Message", selectedOrder.message || "No message"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4 border-b border-neutral-100 pb-3"
                >
                  <span className="text-sm text-neutral-500">{label}</span>
                  <span className="max-w-[65%] break-words text-right text-sm font-medium text-neutral-800">
                    {value}
                  </span>
                </div>
              ))}

              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Order Status</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
