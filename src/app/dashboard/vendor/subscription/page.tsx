
"use client";

import { useEffect, useState } from "react";
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

  // Load current subscription
  useEffect(() => {
    const loadSubscription = async () => {
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
    };

    loadSubscription();
  }, []);

  const isPremium =
    subscription?.plan?.toLowerCase() === "premium";

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      // Check subscription again before checkout
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

      if (statusData.plan?.toLowerCase() === "premium") {
        toast.success("Your Premium subscription is already active!");
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

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to start checkout"
        );
      }

      if (!data.url) {
        throw new Error("Stripe checkout URL was not returned");
      }

      toast.success("Redirecting to Stripe...");

      window.location.href = data.url;
    } catch (error) {
      console.error("Subscription Error:", error);

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
            Vendor Subscription
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
              Enjoy more opportunities to grow your pizza business.
            </p>
          </div>

          <div className="space-y-4 border-y border-gray-100 py-6">
            {[
              "Unlimited active pizza listings",
              "Manage your own menu items",
              "Receive and manage customer orders",
              "Grow your business on PizzaHub",
              "Premium vendor benefits",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
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
                <Loader2 size={18} className="animate-spin" />
                Checking subscription...
              </div>
            ) : isPremium ? (
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={22}
                  className="text-green-600"
                />

                <div>
                  <p className="font-semibold text-green-700">
                    Premium Active
                  </p>

                  <p className="text-xs text-gray-600">
                    Your vendor account already has Premium access.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-[#29211D]">
                  Current Plan: Free
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Upgrade to Premium to unlock all benefits.
                </p>
              </div>
            )}
          </div>

          {/* Upgrade Button */}
          <button
            onClick={handleSubscribe}
            disabled={loading || checking || isPremium}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D93625] px-5 py-3.5 font-semibold text-white transition hover:bg-[#b92d20] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {checking ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Checking Plan...
              </>
            ) : loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Processing...
              </>
            ) : isPremium ? (
              <>
                <ShieldCheck size={19} />
                Premium Active
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
