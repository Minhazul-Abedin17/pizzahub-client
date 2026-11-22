"use client";

import Link from "next/link";
import { Pizza } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type UserRole = "customer" | "vendor" | "admin";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleEmailSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = (formData.get("email") as string).trim();
    const password = formData.get("password") as string;
    const selectedRole = formData.get("role") as UserRole;
    const rememberMe = formData.get("rememberMe") === "on";

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      if (!data?.user) {
        toast.error("Unable to verify your account.");
        return;
      }

      const loggedInUser = data.user as typeof data.user & {
        role?: UserRole;
      };

      const actualRole = loggedInUser.role;

      if (!actualRole) {
        await authClient.signOut();

        toast.error("Account role could not be verified. Please try again.");
        return;
      }

      if (actualRole !== selectedRole) {
        await authClient.signOut();

        toast.error(
          `This account is registered as ${actualRole}. Please select the correct role.`,
        );
        return;
      }

      toast.success("Successfully signed in!");

      if (actualRole === "admin") {
        router.replace("/dashboard/admin");
      } else if (actualRole === "vendor") {
        router.replace("/dashboard/vendor");
      } else {
        router.replace("/dashboard/customer");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Google sign in failed.");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Google sign in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
            <Pizza size={30} className="text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-[#29211D]">Welcome Back!</h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue enjoying PizzaHub.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleEmailSignIn}>
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Account Type
            </label>

            <select
              name="role"
              defaultValue="customer"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor (Restaurant Owner)</option>
              <option value="admin">Admin</option>
            </select>
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
            <label className="mb-2 block text-sm font-semibold">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="rememberMe"
                className="accent-red-600"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="font-medium text-red-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="text-xl font-bold text-blue-600">G</span>
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-red-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
