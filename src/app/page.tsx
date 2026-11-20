
import { Suspense } from "react";

import Banner from "@/components/home/banner";
import FeaturedPizzas from "@/components/home/featured-pizzas";
import Categories from "@/components/home/categories";
import WhyChooseUs from "@/components/home/why-choose-us";
import OrderPromo from "@/components/home/order-promo";

export default function Home() {
  return (
    <main>
      <Banner />

      <Suspense
        fallback={
          <div className="bg-[#FFF9F0] px-5 py-16 text-center text-gray-500">
            Loading featured pizzas...
          </div>
        }
      >
        <FeaturedPizzas />
      </Suspense>

      <Categories />
      <WhyChooseUs />
      <OrderPromo />
    </main>
  );
}
