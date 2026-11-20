
import Link from "next/link";
import {
  Pizza,
  Beef,
  Leaf,
  Flame,
  Fish,
  ChefHat,
} from "lucide-react";

const categories = [
  { name: "Classic", icon: Pizza },
  { name: "Chicken", icon: Beef },
  { name: "Vegetarian", icon: Leaf },
  { name: "Spicy", icon: Flame },
  { name: "Seafood", icon: Fish },
  { name: "Special", icon: ChefHat },
];

const Categories = () => {
  return (
    <section className="bg-white px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-[#D93625]">
            Explore Our Menu
          </p>
          <h2 className="text-3xl font-bold text-[#29211D] md:text-4xl">
            Pizza Categories
          </h2>
          <p className="mt-3 text-gray-600">
            Find your favorite pizza from our delicious collections.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/menu?category=${category.name}`}
                className="group rounded-xl border border-orange-100 bg-[#FFF9F0] p-6 text-center transition hover:-translate-y-1 hover:border-[#D93625] hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#D93625] transition group-hover:bg-[#D93625] group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="font-semibold text-[#29211D]">
                  {category.name}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
