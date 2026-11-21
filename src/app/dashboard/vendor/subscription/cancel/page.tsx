
import Link from "next/link";
import { XCircle } from "lucide-react";

export default function SubscriptionCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F0] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-9 w-9 text-[#D93625]" />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-[#29211D]">
          Payment Cancelled
        </h1>

        <p className="mb-6 text-gray-600">
          Your subscription payment was cancelled.
          No worries! You can try again whenever you are ready.
        </p>

        <Link
          href="/dashboard/vendor/subscription"
          className="inline-block rounded-lg bg-[#D93625] px-6 py-3 font-semibold text-white transition hover:bg-[#b92d20]"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
