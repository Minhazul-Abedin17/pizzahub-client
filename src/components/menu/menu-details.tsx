
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Pizza } from "lucide-react";
import { getMenuItemById, MenuItem } from "@/app/lib/api";



const MenuDetails = () => {
  const params = useParams();
  const id = params.id as string;

  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadItem = async () => {
      const data = await getMenuItemById(id);

      if (!ignore) {
        setItem(data);
        setLoading(false);
      }
    };

    loadItem();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] py-20 text-center text-gray-500">
        Loading pizza details...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] px-5 py-20 text-center">
        <Pizza className="mx-auto mb-4 h-14 w-14 text-[#D93625]" />
        <h2 className="text-2xl font-bold text-[#29211D]">
          Pizza Not Found
        </h2>
        <p className="mt-2 text-gray-500">
          This pizza may be unavailable or no longer exists.
        </p>
        <Link
          href="/menu"
          className="mt-6 inline-block rounded-lg bg-[#D93625] px-6 py-3 font-semibold text-white"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F0] px-5 py-12 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/menu"
          className="mb-8 inline-flex items-center gap-2 font-medium text-[#D93625] hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Menu
        </Link>

        <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2">
          <div className="relative min-h-72 bg-orange-50 md:min-h-[450px]">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-72 items-center justify-center">
                <Pizza className="h-24 w-24 text-orange-300" />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10">
            <span className="mb-4 w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#D93625]">
              {item.category}
            </span>

            <h1 className="text-3xl font-bold text-[#29211D] md:text-4xl">
              {item.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-600">
              {item.description}
            </p>

            {item.location && (
              <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={18} className="text-[#D93625]" />
                {item.location}
              </div>
            )}

            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-500">Price</p>
              <p className="mt-1 text-3xl font-bold text-[#D93625]">
                ৳{item.price}
              </p>
            </div>

            <Link
              href="/sign-in"
              className="mt-7 rounded-lg bg-[#D93625] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#b92b1d]"
            >
              Sign In to Order
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MenuDetails;
