
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  UserCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { toast } from "react-toastify";
import { authClient, useSession } from "@/app/lib/auth-client";

type UserWithRole = {
  name?: string;
  email?: string;
  image?: string | null;
  role?: string;
};

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const user = session?.user as UserWithRole | undefined;

  const role = user?.role || "customer";
  const profileImage = user?.image;

  const dashboardLink =
    role === "admin"
      ? "/dashboard/admin"
      : role === "vendor"
        ? "/dashboard/vendor"
        : "/dashboard/customer";

  const handleSignOut = async () => {
    try {
      setLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Sign out failed");
        return;
      }

      setAccountOpen(false);
      setMobileOpen(false);

      toast.success("Successfully signed out!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const closeMenu = () => {
    setMobileOpen(false);
    setAccountOpen(false);
  };

  const ProfileAvatar = ({ size = 36 }: { size?: number }) => {
    return (
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-orange-200 bg-orange-50"
        style={{ width: size, height: size }}
      >
        {profileImage ? (
          <Image
            src={profileImage}
            alt={user?.name || "Profile"}
            width={size}
            height={size}
            unoptimized
            className="h-full w-full object-cover"
          />
        ) : (
          <UserCircle size={size * 0.65} className="text-red-600" />
        )}
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="PizzaHub"
            width={170}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-red-600"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="text-sm font-medium text-gray-700 hover:text-red-600"
          >
            Browse Menu
          </Link>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-2 rounded-lg border border-orange-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50"
              >
                <ProfileAvatar size={32} />
                <span>{user?.name || "My Account"}</span>
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-xl border bg-white p-2 shadow-lg">
                  <div className="flex items-center gap-3 border-b px-3 py-3">
                    <ProfileAvatar size={42} />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800">
                        {user?.name || "My Account"}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user?.email}
                      </p>
                      <p className="mt-1 text-xs capitalize text-red-600">
                        {role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={dashboardLink}
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-orange-50"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut size={17} />
                    {loggingOut ? "Signing Out..." : "Sign Out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-orange-50 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-orange-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50"
            >
              Home
            </Link>

            <Link
              href="/menu"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50"
            >
              Browse Menu
            </Link>

            {!isPending &&
              (session ? (
                <>
                  <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-3">
                    <ProfileAvatar size={48} />

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-gray-800">
                        {user?.name || "My Account"}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user?.email}
                      </p>
                      <p className="mt-1 text-xs capitalize text-red-600">
                        {role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={dashboardLink}
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    disabled={loggingOut}
                    className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-left text-sm font-semibold text-red-600 disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    {loggingOut ? "Signing Out..." : "Sign Out"}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={closeMenu}
                    className="rounded-lg border border-red-600 px-4 py-2 text-center text-sm font-semibold text-red-600"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={closeMenu}
                    className="rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}
