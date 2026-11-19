
"use client";

import Link from "next/link";
import { Pizza } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  // Google Signup
  const handleGoogleSignUp = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google signup failed.");
        return;
      }

      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong with Google signup.");
    }
  };

  // Email Signup
  const handleEmailSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as string;

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Signup failed.");
        return;
      }

      if (data) {
        toast.success("Successfully signed up!");
        console.log(data);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg sm:p-8">

        {/* Header */}
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

        {/* Email Signup Form */}
        <form className="space-y-4" onSubmit={handleEmailSignUp}>

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="name"
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
              name="email"
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
              name="password"
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
              name="image"
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
              name="role"
              required
              defaultValue="customer"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor (Restaurant Owner)</option>
            </select>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-50"
        >
          <span className="text-xl font-bold text-blue-600">G</span>
          Sign Up with Google
        </button>

        {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-red-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </main>
  );
}
