
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Pizza,
  Loader2,
  Check,
  X,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";
import { toast } from "react-toastify";

type MenuItem = {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  location: string;
  price: number;
  status: string;
  isActive: boolean;
  vendorId: string;
  createdAt?: string;
};

export default function AdminMenuItemsPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState("");
  const [deleteItem, setDeleteItem] = useState<MenuItem | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search.trim()) params.set("search", search.trim());
      if (status !== "all") params.set("status", status);

      const response = await authFetch(
        `/api/admin/menu-items?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load menu items");
      }

      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (status !== "all") params.set("status", status);

        const response = await authFetch(
          `/api/admin/menu-items?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load menu items");
        }

        if (!ignore) setItems(Array.isArray(data) ? data : []);
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

    load();

    return () => {
      ignore = true;
    };
  }, [search, status]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setActionId(id);

      const response = await authFetch(
        `/api/admin/menu-items/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      toast.success(data.message || "Menu status updated");
      await loadItems();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setActionId("");
    }
  };

  const toggleActive = async (item: MenuItem) => {
    try {
      setActionId(item._id);

      const response = await authFetch(
        `/api/admin/menu-items/${item._id}/active`,
        {
          method: "PATCH",
          body: JSON.stringify({ isActive: !item.isActive }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update availability");
      }

      toast.success(data.message || "Availability updated");
      await loadItems();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setActionId("");
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;

    try {
      setActionId(deleteItem._id);

      const response = await authFetch(
        `/api/admin/menu-items/${deleteItem._id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete pizza");
      }

      toast.success(data.message || "Pizza deleted successfully");
      setItems((previous) =>
        previous.filter((item) => item._id !== deleteItem._id)
      );
      setDeleteItem(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setActionId("");
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-red-600">ADMIN PANEL</p>
        <h1 className="mt-1 text-2xl font-bold text-neutral-900">
          Manage Menu Items
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Review, approve, reject, and manage submitted pizzas.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search pizza by name..."
              className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-red-500"
            />
          </div>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            <option value="all">All Items</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <p className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
          <Pizza size={17} />
          {items.length} menu items found
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center rounded-2xl border bg-white py-16">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border bg-white py-16 text-center text-sm text-neutral-500">
          No menu items found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="h-48 bg-orange-50 sm:h-auto sm:w-40 sm:shrink-0">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold capitalize text-red-600">
                      {item.category}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        item.status === "approved"
                          ? "bg-green-50 text-green-600"
                          : item.status === "rejected"
                            ? "bg-red-50 text-red-600"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-neutral-900">
                    {item.name}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                    {item.description}
                  </p>

                  <p className="mt-3 text-sm text-neutral-600">
                    {item.location}
                  </p>

                  <p className="mt-1 text-lg font-bold text-red-600">
                    ৳{item.price}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(item._id, "approved")}
                          disabled={actionId === item._id}
                          className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-50"
                        >
                          <Check size={15} /> Approve
                        </button>

                        <button
                          onClick={() => updateStatus(item._id, "rejected")}
                          disabled={actionId === item._id}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                        >
                          <X size={15} /> Reject
                        </button>
                      </>
                    )}

                    {item.status === "approved" && (
                      <button
                        onClick={() => toggleActive(item)}
                        disabled={actionId === item._id}
                        className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700 hover:bg-orange-100 disabled:opacity-50"
                      >
                        {item.isActive ? (
                          <>
                            <EyeOff size={15} /> Deactivate
                          </>
                        ) : (
                          <>
                            <Eye size={15} /> Activate
                          </>
                        )}
                      </button>
                    )}

                    <button
                      onClick={() => setDeleteItem(item)}
                      disabled={actionId === item._id}
                      className="inline-flex items-center gap-1 rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-200 disabled:opacity-50"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-neutral-900">
              Delete Menu Item?
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Are you sure you want to delete {deleteItem.name}? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteItem(null)}
                disabled={actionId === deleteItem._id}
                className="rounded-lg border px-4 py-2 text-sm font-semibold text-neutral-600"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={actionId === deleteItem._id}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {actionId === deleteItem._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
