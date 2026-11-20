
import Image from "next/image";
import Link from "next/link";
import { Pizza } from "lucide-react";
import { getFeaturedItems } from "@/app/lib/api";

const FeaturedPizzas = async () => {
  const pizzas = await getFeaturedItems();

  return (
    <section className="bg-[#FFF9F0] px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-[#D93625]">
            Our Special Menu
          </p>

          <h2 className="text-3xl font-bold text-[#29211D] md:text-4xl">
            Our Featured Pizzas
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Enjoy freshly prepared pizzas made with delicious ingredients.
          </p>
        </div>

        {pizzas.length === 0 ? (
          <div className="rounded-xl border border-dashed border-orange-300 bg-white p-10 text-center">
            <Pizza className="mx-auto mb-3 h-10 w-10 text-[#D93625]" />
            <h3 className="text-lg font-semibold text-[#29211D]">
              No Featured Pizzas Yet
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Our delicious pizzas will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pizzas.slice(0, 6).map((pizza) => (
              <div
                key={pizza._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-56 w-full">
                  {pizza.image ? (
                    <Image
                      src={pizza.image}
                      alt={pizza.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-orange-50">
                      <Pizza className="h-16 w-16 text-orange-300" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-[#29211D]">
                      {pizza.name}
                    </h3>
                    <span className="whitespace-nowrap font-bold text-[#D93625]">
                      ৳{pizza.price}
                    </span>
                  </div>

                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                    {pizza.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#D93625]">
                      {pizza.category}
                    </span>

                    <Link
                      href={`/menu/${pizza._id}`}
                      className="font-semibold text-[#D93625] hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-block rounded-lg bg-[#D93625] px-7 py-3 font-semibold text-white transition hover:bg-[#b92b1d]"
          >
            Explore All Pizzas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPizzas;
