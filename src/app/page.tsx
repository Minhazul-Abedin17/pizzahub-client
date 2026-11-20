
import Banner from "@/components/home/banner";
import Categories from "@/components/home/categories";
import FeaturedPizzas from "@/components/home/featured-pizzas";
import OrderPromo from "@/components/home/order-promo";
import WhyChooseUs from "@/components/home/why-choose-us";

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
