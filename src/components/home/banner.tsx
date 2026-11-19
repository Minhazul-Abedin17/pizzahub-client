
import Link from "next/link";
import { ArrowRight, Pizza } from "lucide-react";

const Banner = () => {
  return (
    <section className="overflow-hidden bg-[#FFF1DF]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">

        {/* Banner Text */}
        <div>
          <span className="mb-5 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-red-600">
            🍕 Freshly Baked, Just for You
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-[#29211D] sm:text-5xl lg:text-6xl">
            Hot & Fresh Pizza
            <span className="block text-red-600">
              Delivered to Your Door
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            Enjoy delicious pizzas made with fresh ingredients.
            Discover your favorite pizza and order from the best
            local restaurants with PizzaHub.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Explore Pizza Menu
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/sign-in"
              className="rounded-lg border-2 border-red-600 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
            >
              Order Now
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-gray-600">
            <span className="text-xl">⭐</span>
            <p>Fresh Ingredients • Great Taste • Fast Delivery</p>
          </div>
        </div>

        {/* Banner Illustration */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-64 w-64 rounded-full bg-orange-200 sm:h-80 sm:w-80" />

          <div className="relative flex h-72 w-72 items-center justify-center rounded-full border-8 border-white bg-orange-100 shadow-xl sm:h-96 sm:w-96">
            <Pizza
              size={180}
              strokeWidth={1.2}
              className="text-red-600 sm:h-56 sm:w-56"
            />

            <span className="absolute right-0 top-8 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
              Fresh & Hot!
            </span>

            <span className="absolute bottom-8 left-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-red-600 shadow-lg">
              Made with Love ❤️
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;
