import Link from "next/link";
import {
  ArrowRight,
  Beef,
  ChefHat,
  Fish,
  Flame,
  Leaf,
  Pizza,
} from "lucide-react";

const categories = [
  {
    name: "Classic",
    icon: Pizza,
    tagline: "Timeless favorites",
    tone: "bg-red-50 text-red-600",
  },
  {
    name: "Chicken",
    icon: Beef,
    tagline: "Juicy & loaded",
    tone: "bg-amber-50 text-amber-600",
  },
  {
    name: "Vegetarian",
    icon: Leaf,
    tagline: "Fresh & green",
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Spicy",
    icon: Flame,
    tagline: "Bring the heat",
    tone: "bg-orange-50 text-orange-600",
  },
  {
    name: "Seafood",
    icon: Fish,
    tagline: "Ocean-fresh toppings",
    tone: "bg-sky-50 text-sky-600",
  },
  {
    name: "Special",
    icon: ChefHat,
    tagline: "Chef's creations",
    tone: "bg-rose-50 text-rose-600",
  },
];

const Categories = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {/* Ambient glow + dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(#e7d5c0_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white px-4 py-1.5 text-xs font-semibold text-red-600 shadow-2xs sm:text-sm">
            <Pizza className="h-4 w-4" />
            Explore our menu
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-[#29211D] sm:text-4xl lg:text-5xl">
            Find your{" "}
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
              perfect slice
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg">
            Pick a category and discover freshly baked pizzas from the best
            local kitchens.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {categories.map(({ name, icon: Icon, tagline, tone }) => (
            <Link
              key={name}
              href={`/menu?category=${encodeURIComponent(name)}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-neutral-200/70 bg-white px-3 py-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-xl hover:shadow-red-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F0] sm:px-4 sm:py-8"
            >
              {/* Hover wash */}
              <span
                aria-hidden
                className="absolute inset-0 -z-0 bg-gradient-to-b from-red-50/0 to-red-50 opacity-0 transition duration-300 group-hover:opacity-100"
              />

              {/* Icon tile */}
              <span
                className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-600/30 ${tone}`}
              >
                <Icon className="h-8 w-8" />
              </span>

              <h3 className="relative z-10 mt-5 text-base font-bold text-[#29211D] sm:text-lg">
                {name}
              </h3>
              <p className="relative z-10 mt-1 text-xs text-neutral-500 sm:text-sm">
                {tagline}
              </p>

              {/* Arrow reveals on hover (always visible on touch devices) */}
              <span className="relative z-10 mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition duration-300 group-hover:bg-red-600 group-hover:text-white [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/menu"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition duration-200 hover:-translate-y-0.5 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F0]"
          >
            View full menu
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;