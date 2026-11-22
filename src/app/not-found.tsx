
"use client";

import Link from "next/link";
import { Pizza, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F0] px-4 py-10">
      <div className="w-full max-w-lg text-center">
        {/* Pizza Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#D93625]/10">
          <Pizza size={48} className="text-[#D93625]" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold tracking-tight text-[#D93625] sm:text-8xl">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-bold text-[#29211D] sm:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#29211D]/65 sm:text-base">
          Looks like this pizza went missing!
          The page you are looking for doesn&apos;t exist
          or may have been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#D93625] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B92B1D]"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#D93625]/30 px-6 py-3 text-sm font-semibold text-[#29211D] transition hover:bg-[#D93625]/10"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Brand */}
        <p className="mt-12 text-sm font-semibold text-[#29211D]">
          Pizza<span className="text-[#D93625]">Hub</span>
        </p>

        <p className="mt-1 text-xs text-[#29211D]/50">
          Fresh Pizza. Happy Moments. 🍕
        </p>
      </div>
    </div>
  );
}
