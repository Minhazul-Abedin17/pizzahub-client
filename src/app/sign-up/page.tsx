
"use client";

import Link from "next/link";
import { Pizza, Eye, EyeOff } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { toast } from "sonner";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserRole = "customer" | "vendor";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;
    const image = (formData.get("image") as string).trim();

    const selectedRole = formData.get("role");

    if (selectedRole !== "customer" && selectedRole !== "vendor") {
      toast.error("Please select a valid account role.");
      return;
    }

    const role: UserRole = selectedRole;

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
        role,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Signup failed.");
        return;
      }

      if (data) {
        toast.success("Account created successfully!");

        router.replace(
          role === "vendor"
            ? "/dashboard/vendor"
            : "/dashboard/customer",
        );

        router.refresh();
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google signup failed.");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google signup failed. Please try again.");
      setGoogleLoading(false);
    }
  };

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

        <form className="space-y-4" onSubmit={handleEmailSignUp}>
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

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 8 characters"
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-red-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-red-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Use at least 8 characters.
            </p>
          </div>

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

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Select Account Role
            </label>

            <select
              name="role"
              defaultValue="customer"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor (Restaurant Owner)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-xl font-bold text-blue-600">G</span>
          {googleLoading ? "Connecting..." : "Sign Up with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-red-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-gray-400">
          Administrator accounts are created securely.
        </p>
      </div>
    </main>
  );
}
