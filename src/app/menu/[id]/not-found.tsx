
import Link from "next/link";
import { Pizza } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#FFF9F0] px-5">
      <div className="text-center">
        <Pizza className="mx-auto mb-5 h-16 w-16 text-[#D93625]" />

        <h1 className="text-3xl font-bold text-[#29211D]">
          Pizza Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          Sorry, this pizza is unavailable or does not exist.
        </p>

        <Link
          href="/menu"
          className="mt-6 inline-block rounded-lg bg-[#D93625] px-6 py-3 font-semibold text-white hover:bg-[#b92b1d]"
        >
          Browse Menu
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
