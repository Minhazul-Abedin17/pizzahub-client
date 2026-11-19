
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/public/logo.png"
            alt="PizzaHub Logo"
            width={175}
            height={65}
            priority
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="font-medium text-gray-700 hover:text-red-600">
            Home
          </Link>

          <Link href="/menu" className="font-medium text-gray-700 hover:text-red-600">
            Browse Menu
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/sign-in"
            className="rounded-lg px-5 py-2 font-semibold text-gray-700 hover:bg-orange-50"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-orange-50 md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-orange-100 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="font-medium text-gray-700"
            >
              Home
            </Link>

            <Link
              href="/menu"
              onClick={() => setIsOpen(false)}
              className="font-medium text-gray-700"
            >
              Browse Menu
            </Link>

            <Link
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="font-medium text-gray-700"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-red-600 px-4 py-2 text-center font-semibold text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
