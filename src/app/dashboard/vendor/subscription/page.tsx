
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Crown,
  Loader2,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { authFetch } from "@/app/lib/auth-fetch";

type Subscription = {
  plan: string;
  status: string;
  subscriptionUpdatedAt?: string | null;
};

export default function VendorSubscriptionPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [subscription, setSubscription] =
    useState<Subscription | null>(null);

  // Load subscription details
  const loadSubscription = useCallback(async () => {
    try {
      const response = await authFetch("/api/subscription/me");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load subscription"
        );
      }

      setSubscription(data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not load subscription"
      );
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    loadSubscription();
  }, [loadSubscription]);

  // Check Premium status
  const isPremium =
    subscription?.plan?.toLowerCase() === "premium" &&
    subscription?.status?.toLowerCase() === "active";

  // Subscribe to Premium
  const handleSubscribe = async () => {
    if (loading || checking) return;

    // Already Premium
    if (isPremium) {
      toast.info("You already have Premium access!");
      return;
    }

    try {
      setLoading(true);

      // Verify subscription from backend
      const statusResponse = await authFetch(
        "/api/subscription/me"
      );

      const statusData = await statusResponse.json();

      if (!statusResponse.ok) {
        throw new Error(
          statusData.message || "Unable to verify subscription"
        );
      }

      setSubscription(statusData);

      const alreadySubscribed =
        statusData.plan?.toLowerCase() === "premium" &&
        statusData.status?.toLowerCase() === "active";

      if (alreadySubscribed) {
        toast.info("You already have Premium access!");
        return;
      }

      // Create Stripe Checkout Session
      const response = await authFetch(
        "/api/subscription/checkout",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (response.status === 409) {
        toast.info("You already have Premium access!");
        await loadSubscription();
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Try later!"
        );
      }

      if (!data.url) {
        throw new Error("Stripe checkout URL was not returned");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#D93625]"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-[#D93625]">
            <Crown size={28} />
          </div>

          <h1 className="text-3xl font-bold text-[#29211D] sm:text-4xl">
            Vendor Subscription
          </h1>

          <p className="mt-3 text-gray-600">
            Grow your pizza business with PizzaHub Premium.
          </p>
        </div>

        {/* Premium Card */}
        <div className="mx-auto max-w-xl rounded-2xl border border-orange-200 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-6">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-[#D93625]">
              Premium Plan
            </span>

            <h2 className="mt-4 text-2xl font-bold text-[#29211D]">
              Unlimited Opportunities
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Enjoy more opportunities to grow your pizza business.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 border-y border-gray-100 py-6">
            {[
              "Unlimited active pizza listings",
              "Manage your own menu items",
              "Receive and manage customer orders",
              "Grow your business on PizzaHub",
              "Premium vendor benefits",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3"
              >
                <Check
                  className="shrink-0 text-green-600"
                  size={19}
                />

                <span className="text-sm text-gray-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Subscription Status */}
          <div className="mt-6 rounded-xl border border-orange-100 bg-orange-50 p-4">
            {checking ? (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Checking subscription...
              </div>
            ) : isPremium ? (
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={24}
                  className="text-green-600"
                />

                <div>
                  <p className="font-semibold text-green-700">
                    Premium Active
                  </p>

                  <p className="text-xs text-gray-600">
                    You already have Lifetime Premium access.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-[#29211D]">
                  Current Plan: Free
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Pay once and enjoy Premium benefits permanently.
                </p>
              </div>
            )}
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribe}
            disabled={loading || checking}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D93625] px-5 py-3.5 font-semibold text-white transition hover:bg-[#b92d20] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {checking ? (
              <>
                <Loader2
                  size={19}
                  className="animate-spin"
                />
                Checking Plan...
              </>
            ) : loading ? (
              <>
                <Loader2
                  size={19}
                  className="animate-spin"
                />
                Processing...
              </>
            ) : isPremium ? (
              <>
                <ShieldCheck size={19} />
                Already Subscribed
              </>
            ) : (
              <>
                <Crown size={19} />
                Upgrade to Premium
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            One-time secure payment powered by Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}
