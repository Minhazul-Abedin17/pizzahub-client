
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SubscriptionSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F0] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-9 w-9 text-green-600" />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-[#29211D]">
          Payment Successful!
        </h1>

        <p className="mb-6 text-gray-600">
          Your payment has been submitted successfully.
          Your Premium subscription status is being confirmed.
          Please check your dashboard shortly.
        </p>

        <Link
          href="/dashboard/vendor/subscription"
          className="inline-block rounded-lg bg-[#D93625] px-6 py-3 font-semibold text-white transition hover:bg-[#b92d20]"
        >
          Back to Subscription
        </Link>
      </div>
    </div>
  );
}
