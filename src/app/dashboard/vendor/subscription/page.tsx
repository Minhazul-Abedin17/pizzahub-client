"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Crown, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/app/lib/auth-fetch";

export default function VendorSubscriptionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      console.log("Upgrade button clicked");

      const response = await authFetch("/api/subscription/checkout", {
        method: "POST",
      });

      const data = await response.json();

      console.log("Stripe Checkout Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Unable to start checkout");
      }

      if (!data.url) {
        throw new Error("Stripe checkout URL was not returned");
      }

      toast.success("Redirecting to Stripe...");

      window.location.href = data.url;
    } catch (error) {
      console.error("Subscription Error:", error);

      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#D93625]"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-[#D93625]">
            <Crown size={28} />
          </div>

          <h1 className="text-3xl font-bold text-[#29211D] sm:text-4xl">
            Upgrade Your Vendor Plan
          </h1>

          <p className="mt-3 text-gray-600">
            Grow your pizza business with PizzaHub Premium.
          </p>
        </div>

        <div className="mx-auto max-w-xl rounded-2xl border border-orange-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-[#D93625]">
              Premium Plan
            </span>

            <h2 className="mt-4 text-2xl font-bold text-[#29211D]">
              Unlimited Opportunities
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              The subscription price is configured in your Stripe account.
            </p>
          </div>

          <div className="space-y-4 border-y border-gray-100 py-6">
            {[
              "Unlimited active pizza listings",
              "Manage your own menu items",
              "Receive and manage customer orders",
              "Grow your business on PizzaHub",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="shrink-0 text-green-600" size={19} />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D93625] px-5 py-3.5 font-semibold text-white transition hover:bg-[#b92d20] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={19} />
                Redirecting to Stripe...
              </>
            ) : (
              <>
                <Crown size={19} />
                Upgrade to Premium
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Secure payment powered by Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}
