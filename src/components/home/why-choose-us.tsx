
import {
  Clock,
  Pizza,
  Truck,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: Pizza,
    title: "Fresh Ingredients",
    description: "We use fresh and quality ingredients for every pizza.",
  },
  {
    icon: Clock,
    title: "Quick Preparation",
    description: "Your favorite pizza is prepared with care and speed.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Enjoy hot and delicious pizza delivered to your door.",
  },
  {
    icon: HeartHandshake,
    title: "Made with Care",
    description: "Your satisfaction and happiness are always our priority.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-[#29211D] px-5 py-16 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-orange-400">
            Why PizzaHub
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-300">
            Great taste, fresh ingredients and friendly service in every order.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center transition hover:bg-white/10"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#D93625]">
                  <Icon size={27} />
                </div>

                <h3 className="mb-2 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm leading-6 text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
