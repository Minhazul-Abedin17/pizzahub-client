
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Pizza } from "lucide-react";
import { getMenuItemById } from "@/app/lib/api";
import OrderForm from "@/components/menu/order-form";

export const instant = false;

type Props = {
  params: Promise<{ id: string }>;
};

const PizzaDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const pizza = await getMenuItemById(id);

  if (!pizza) {
    notFound();
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
          <div className="relative min-h-[300px] bg-orange-50 md:min-h-[500px]">
            {pizza.image ? (
              <Image
                src={pizza.image}
                alt={pizza.name}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center">
                <Pizza className="h-24 w-24 text-orange-300" />
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10">
            <span className="mb-4 w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#D93625]">
              {pizza.category}
            </span>

            <h1 className="text-3xl font-bold text-[#29211D] md:text-4xl">
              {pizza.name}
            </h1>

            <p className="mt-5 leading-7 text-gray-600">
              {pizza.description}
            </p>

            {pizza.location && (
              <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={18} className="text-[#D93625]" />
                {pizza.location}
              </div>
            )}

            <div className="mt-8 border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-500">Price</p>
              <p className="mt-1 text-3xl font-bold text-[#D93625]">
                ৳{pizza.price}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <OrderForm menuItemId={pizza._id} />
        </div>
      </div>
    </main>
  );
};

export default PizzaDetailsPage;
