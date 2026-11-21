
"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Users,
  Loader2,
  ShieldBan,
  ShieldCheck,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";
import { toast } from "react-toastify";

type User = {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  isBlocked?: boolean;
  status?: string;
  createdAt?: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      try {
        const params = new URLSearchParams();

        if (search.trim()) params.set("search", search.trim());
        if (role !== "all") params.set("role", role);

        const response = await authFetch(
          `/api/admin/users?${params.toString()}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load users");
        }

        if (!ignore) setUsers(Array.isArray(data) ? data : []);
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

    loadUsers();

    return () => {
      ignore = true;
    };
  }, [search, role]);

  const handleBlockToggle = async (user: User) => {
    const userId = String(user._id || user.id || "");

    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    const isBlocked = user.isBlocked === true || user.status === "blocked";

    try {
      setUpdatingId(userId);

      const response = await authFetch(
        `/api/admin/users/${userId}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ isBlocked: !isBlocked }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
      }

      setUsers((previous) =>
        previous.map((item) =>
          String(item._id || item.id) === userId
            ? {
                ...item,
                isBlocked: !isBlocked,
                status: !isBlocked ? "blocked" : "active",
              }
            : item
        )
      );

      toast.success(data.message || "User status updated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-red-600">ADMIN PANEL</p>
        <h1 className="mt-1 text-2xl font-bold text-neutral-900">
          Manage Users
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          View, search, and manage registered PizzaHub users.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-red-500"
            />
          </div>

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-red-500"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
          <Users size={17} />
          {users.length} users found
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-sm text-neutral-500">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">User</th>
                  <th className="px-5 py-4 font-semibold">Role</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Joined</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {users.map((user) => {
                  const userId = String(user._id || user.id || "");
                  const blocked =
                    user.isBlocked === true || user.status === "blocked";

                  return (
                    <tr key={userId} className="hover:bg-neutral-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-red-600">
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-neutral-800">
                              {user.name || "Unknown"}
                            </p>
                            <p className="truncate text-xs text-neutral-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 capitalize text-neutral-600">
                        {user.role}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            blocked
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {blocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-neutral-500">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "—"}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleBlockToggle(user)}
                          disabled={updatingId === userId || user.role === "admin"}
                          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${
                            blocked
                              ? "bg-green-50 text-green-700 hover:bg-green-100"
                              : "bg-red-50 text-red-600 hover:bg-red-100"
                          }`}
                        >
                          {updatingId === userId ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : blocked ? (
                            <ShieldCheck size={14} />
                          ) : (
                            <ShieldBan size={14} />
                          )}
                          {blocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
