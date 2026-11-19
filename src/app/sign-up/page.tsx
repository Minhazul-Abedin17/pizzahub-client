
import Link from "next/link";
import { Pizza } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">

        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <Pizza size={30} className="text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-[#29211D]">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join PizzaHub and enjoy delicious pizza.
          </p>
        </div>

        <form className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="At least 8 characters"
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
            />
            <p className="mt-1 text-xs text-gray-400">
              Use uppercase and lowercase letters.
            </p>
          </div>

          {/* Profile Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Profile Image URL (Optional)
            </label>
            <input
              type="url"
              placeholder="Paste your image URL"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          {/* Account Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Select Account Role
            </label>

            <select
              required
              defaultValue="customer"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor (Restaurant Owner)</option>
            </select>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Create Account
          </button>
        </form>

        {/* Google Signup */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-50"
        >
          <span className="text-xl font-bold text-blue-600">G</span>
          Sign Up with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-red-600 hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </main>
  );
}
