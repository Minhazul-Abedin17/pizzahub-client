
"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Loader2,
  Search,
  Receipt,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";
import { toast } from "react-toastify";

type Transaction = {
  _id: string;
  vendorName?: string;
  vendorEmail?: string;
  amount: number;
  currency: string;
  type?: string;
  status: string;
  stripeInvoiceId?: string;
  createdAt: string;
};

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadTransactions = async () => {
      try {
        const response = await authFetch("/api/admin/transactions");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load transactions");
        }

        if (!ignore) {
          setTransactions(Array.isArray(data) ? data : []);
        }
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

    loadTransactions();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const searchText = search.toLowerCase();

    return (
      transaction.vendorName?.toLowerCase().includes(searchText) ||
      transaction.vendorEmail?.toLowerCase().includes(searchText) ||
      transaction.status?.toLowerCase().includes(searchText) ||
      transaction.stripeInvoiceId?.toLowerCase().includes(searchText)
    );
  });

  const totalPaid = transactions
    .filter((transaction) => transaction.status === "paid")
    .reduce((total, transaction) => total + Number(transaction.amount || 0), 0);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-red-600">ADMIN PANEL</p>
        <h1 className="mt-1 text-2xl font-bold text-neutral-900">
          Transactions
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          View vendor subscription payment records.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Transactions</p>
              <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                {transactions.length}
              </h2>
            </div>
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <Receipt size={23} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Paid Amount</p>
              <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                {totalPaid.toLocaleString()}
              </h2>
              <p className="mt-1 text-xs text-neutral-400">
                Amount shown in transaction currency
              </p>
            </div>
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <CreditCard size={23} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by vendor, email, status, or invoice ID..."
            className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-red-500"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-16 text-center">
            <Receipt className="mx-auto h-10 w-10 text-neutral-300" />
            <p className="mt-3 text-sm text-neutral-500">
              No transactions found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">Vendor</th>
                  <th className="px-5 py-4 font-semibold">Plan</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-100">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-neutral-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-neutral-800">
                        {transaction.vendorName || "Vendor"}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {transaction.vendorEmail || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4 capitalize text-neutral-600">
                      {transaction.type || "Subscription"}
                    </td>

                    <td className="px-5 py-4 font-semibold text-neutral-800">
                      {Number(transaction.amount || 0).toLocaleString()}{" "}
                      {(transaction.currency || "").toUpperCase()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          transaction.status === "paid"
                            ? "bg-green-50 text-green-600"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-neutral-500">
                      {transaction.createdAt
                        ? new Date(transaction.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
