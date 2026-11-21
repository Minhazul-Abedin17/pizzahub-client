import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Flame,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F0]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-12 md:gap-8 md:py-16 lg:px-8 lg:py-20">
        {/* Left Content */}
        <div className="space-y-6 text-center md:col-span-6 md:text-left lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-red-600 shadow-2xs sm:text-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Curated Local Pizza Marketplace</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.08]">
            Stone-Baked Pizzas From{" "}
            <span className="mt-1 block text-red-600">
              Your Neighborhood Kitchens
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base lg:text-[1.05rem] md:mx-0">
            Browse verified local vendors, compare freshly crafted pies, and
            order hot classics, cheesy specials, and loaded chicken favorites
            with effortless tracking.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col items-stretch justify-center gap-3 pt-1 sm:flex-row sm:items-center md:justify-start">
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm shadow-red-600/20 transition duration-200 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              <span>Browse Pizza Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 shadow-2xs transition duration-200 hover:border-red-300 hover:bg-red-50/50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
              Sign In to Order
            </Link>
          </div>

          {/* Clean Feature Strip */}
          <div className="grid grid-cols-1 gap-3 border-t border-neutral-200/80 pt-5 text-left sm:grid-cols-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-neutral-200/70 bg-white/90 px-3.5 py-2.5 shadow-2xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <Flame className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-neutral-900">
                  Oven Fresh
                </p>
                <p className="truncate text-[11px] text-neutral-500">
                  Baked to order
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-neutral-200/70 bg-white/90 px-3.5 py-2.5 shadow-2xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-neutral-900">
                  Verified Vendors
                </p>
                <p className="truncate text-[11px] text-neutral-500">
                  Quality checked
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-neutral-200/70 bg-white/90 px-3.5 py-2.5 shadow-2xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-neutral-900">
                  Quick Dispatch
                </p>
                <p className="truncate text-[11px] text-neutral-500">
                  Hot to your door
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Showcase Image */}
        <div className="relative md:col-span-6 lg:col-span-6">
          <div className="relative mx-auto max-w-xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-xl shadow-neutral-900/10">
              <Image
                src="/banner.jpg"
                alt="Freshly baked artisan pizza on PizzaHub"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-103"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/55 via-neutral-950/10 to-transparent" />

              {/* Bottom Overlay Caption */}
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-5">
                <div className="space-y-0.5 text-white">
                  <span className="inline-block rounded-md bg-red-600 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                    House Favorite
                  </span>
                  <p className="text-base font-bold sm:text-lg">
                    Wood-Fired Classics &amp; Specials
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-800 shadow-sm backdrop-blur-xs">
                  <MapPin className="h-3.5 w-3.5 text-red-600" />
                  <span>Local Kitchens</span>
                </div>
              </div>
            </div>

            {/* Clean Floating Highlight Card */}
            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-neutral-200/80 bg-white px-4 py-3 shadow-sm sm:mx-4 sm:-mt-6 sm:relative sm:z-10">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-sm font-bold text-amber-600 ring-1 ring-amber-200/60">
                  4.9
                </span>
                <div>
                  <p className="text-xs font-bold text-neutral-900 sm:text-sm">
                    Loved by Local Pizza Fans
                  </p>
                  <p className="text-xs text-neutral-500">
                    Hand-stretched crust, bold sauces &amp; generous toppings
                  </p>
                </div>
              </div>

              <Link
                href="/menu"
                className="hidden shrink-0 text-xs font-semibold text-red-600 transition hover:text-red-700 sm:inline-flex sm:items-center sm:gap-1"
              >
                <span>See Menu</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;