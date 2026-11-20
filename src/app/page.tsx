
export const instant = false;

import Banner from "@/components/home/banner";
import FeaturedPizzas from "@/components/home/featured-pizzas";
import Categories from "@/components/home/categories";
import WhyChooseUs from "@/components/home/why-choose-us";
import OrderPromo from "@/components/home/order-promo";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedPizzas />
      <Categories />
      <WhyChooseUs />
      <OrderPromo />
    </main>
  );
}
