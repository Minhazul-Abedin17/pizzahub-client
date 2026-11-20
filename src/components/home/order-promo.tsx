
import Link from "next/link";
import { ArrowRight, Pizza } from "lucide-react";

const OrderPromo = () => {
  return (
    <section className="bg-[#FFF9F0] px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 rounded-2xl bg-[#D93625] px-7 py-10 text-center text-white md:flex-row md:px-14 md:text-left">
        <div className="max-w-2xl">
          <p className="mb-2 font-semibold uppercase tracking-widest text-orange-200">
            Your Pizza Moment
          </p>

          <h2 className="text-3xl font-bold md:text-4xl">
            Craving Something Delicious?
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/90 md:text-base">
            Explore our menu and find the perfect pizza for your next meal.
          </p>

          <Link
            href="/menu"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#D93625] transition hover:bg-orange-50"
          >
            Order Your Pizza
            <ArrowRight size={18} />
          </Link>
        </div>

        <Pizza className="h-28 w-28 shrink-0 text-orange-200 md:h-36 md:w-36" />
      </div>
    </section>
  );
};

export default OrderPromo;
