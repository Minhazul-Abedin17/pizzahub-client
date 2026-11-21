
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  MessageSquare,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import { authFetch } from "@/app/lib/auth-fetch";
import { authClient } from "@/app/lib/auth-client";

type OrderFormProps = {
  menuItemId: string;
};

type UserWithRole = {
  role?: string;
};

export default function OrderForm({ menuItemId }: OrderFormProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [submitting, setSubmitting] = useState(false);

  const userRole = (session?.user as UserWithRole | undefined)?.role;
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      router.push("/signIn");
      return;
    }

    if (userRole !== "customer") {
      toast.error("Only customers can place orders");
      return;
    }

    if (!deliveryDate || !deliveryAddress.trim()) {
      toast.error("Please enter your delivery date and address");
      return;
    }

    const quantityNumber = Number(quantity);

    if (
      !Number.isInteger(quantityNumber) ||
      quantityNumber < 1 ||
      quantityNumber > 20
    ) {
      toast.error("Quantity must be between 1 and 20");
      return;
    }

    try {
      setSubmitting(true);

      const response = await authFetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          menuItemId,
          deliveryDate,
          deliveryAddress: deliveryAddress.trim(),
          message: message.trim(),
          quantity: quantityNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      toast.success(data.message || "Your order has been placed!");
      router.push("/dashboard/customer/orders");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center rounded-xl border bg-white p-8">
        <Loader2 className="h-6 w-6 animate-spin text-red-600" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-xl border border-orange-200 bg-white p-6 text-center">
        <p className="font-semibold text-neutral-800">
          Sign in to place your order.
        </p>
        <Link
          href="/signIn"
          className="mt-4 inline-block rounded-lg bg-[#D93625] px-6 py-3 font-semibold text-white hover:bg-[#b92b1d]"
        >
          Sign In to Order
        </Link>
      </div>
    );
  }

  if (userRole !== "customer") {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="font-semibold text-amber-800">
          Ordering is available for customers only.
        </p>
        <p className="mt-1 text-sm text-amber-700">
          Vendors and administrators cannot place customer orders.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <p className="text-sm font-semibold text-red-600">PLACE YOUR ORDER</p>
        <h2 className="mt-1 text-xl font-bold text-neutral-900">
          Delivery Information
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Enter your delivery details to submit your order.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-neutral-700">
          Delivery Date
        </label>
        <div className="relative">
          <CalendarDays
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="date"
            min={minDate}
            value={deliveryDate}
            onChange={(event) => setDeliveryDate(event.target.value)}
            required
            className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-neutral-700">
          Delivery Address
        </label>
        <div className="relative">
          <MapPin
            size={18}
            className="absolute left-3 top-3.5 text-neutral-400"
          />
          <textarea
            value={deliveryAddress}
            onChange={(event) => setDeliveryAddress(event.target.value)}
            placeholder="Enter your complete delivery address"
            rows={3}
            required
            className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-neutral-700">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          max="20"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
        <p className="mt-1 text-xs text-neutral-400">
          You can order up to 20 items.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-neutral-700">
          Additional Message
          <span className="ml-1 font-normal text-neutral-400">(Optional)</span>
        </label>
        <div className="relative">
          <MessageSquare
            size={18}
            className="absolute left-3 top-3.5 text-neutral-400"
          />
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Any special instructions?"
            rows={3}
            className="w-full rounded-xl border border-neutral-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      <div className="rounded-xl bg-orange-50 p-4">
        <p className="text-sm leading-6 text-orange-800">
          Your order will be submitted with Pending status. The restaurant will
          review and accept or reject your request.
        </p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Placing Order...
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            Place Order
          </>
        )}
      </button>
    </form>
  );
}
