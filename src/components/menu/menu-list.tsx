
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Pizza, SlidersHorizontal } from "lucide-react";
import { getMenuItems, MenuItem } from "@/app/lib/api";



type MenuListProps = {
  initialCategory: string;
};

const categories = [
  "All",
  "Classic",
  "Chicken",
  "Vegetarian",
  "Spicy",
  "Seafood",
  "Special",
];

const MenuList = ({ initialCategory }: MenuListProps) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadItems = async () => {
      setLoading(true);

      const data = await getMenuItems({
        search,
        category,
        location,
        sort,
      });

      if (!ignore) {
        setItems(data);
        setLoading(false);
      }
    };

    loadItems();

    return () => {
      ignore = true;
    };
  }, [search, category, location, sort]);

  return (
    <main className="min-h-screen bg-[#FFF9F0] px-5 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-[#D93625]">
            Fresh & Delicious
          </p>

          <h1 className="text-3xl font-bold text-[#29211D] md:text-5xl">
            Explore Our Menu
          </h1>

          <p className="mt-3 text-gray-600">
            Find your favorite pizza and enjoy every bite.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={19}
            />
            <input
              type="text"
              placeholder="Search pizza..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[#D93625]"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#D93625]"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#D93625]"
          />

          <div className="relative">
            <SlidersHorizontal
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-[#D93625]"
            >
              <option value="">Default Sorting</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#29211D]">
            All Pizzas
          </h2>

          <p className="text-sm text-gray-500">
            {items.length} items found
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">
            Loading pizzas...
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-orange-300 bg-white p-12 text-center">
            <Pizza className="mx-auto mb-3 h-12 w-12 text-[#D93625]" />
            <h3 className="text-xl font-semibold text-[#29211D]">
              No Pizzas Found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filter options.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-56 w-full">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-orange-50">
                      <Pizza className="h-16 w-16 text-orange-300" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-[#29211D]">
                      {item.name}
                    </h3>
                    <span className="font-bold text-[#D93625]">
                      ৳{item.price}
                    </span>
                  </div>

                  <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                    {item.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-orange-50 px-3 py-1">
                      {item.category}
                    </span>
                    {item.location && (
                      <span className="rounded-full bg-gray-100 px-3 py-1">
                        {item.location}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/menu/${item._id}`}
                    className="block rounded-lg bg-[#D93625] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#b92b1d]"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MenuList;
