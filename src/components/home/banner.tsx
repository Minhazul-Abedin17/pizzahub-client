"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Check,
  Flame,
  PackageCheck,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

/* ---------- data ---------- */
const words = ["hot.", "fresh.", "fast.", "local."];

const orders = [
  { item: "Pepperoni Feast", who: "Rafi · Agrabad", price: "৳349" },
  { item: "BBQ Chicken", who: "Nusrat · GEC Circle", price: "৳429" },
  { item: "Four Cheese", who: "Tanvir · Khulshi", price: "৳389" },
];

const steps = [
  { label: "Confirmed", icon: Check },
  { label: "Baking", icon: Flame },
  { label: "On the way", icon: Bike },
  { label: "Delivered", icon: PackageCheck },
];

const perks = [
  {
    icon: Flame,
    title: "Oven fresh",
    text: "Every pizza is baked to order",
    tone: "bg-red-50 text-red-600",
  },
  {
    icon: ShieldCheck,
    title: "Verified vendors",
    text: "Only quality-checked kitchens",
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Truck,
    title: "Quick dispatch",
    text: "Hot to your door, tracked live",
    tone: "bg-amber-50 text-amber-600",
  },
];

// Fixed values (no Math.random) so server and client render the same HTML
const embers = [
  { left: "6%", size: 6, delay: 0, dur: 9 },
  { left: "14%", size: 4, delay: 2.5, dur: 11 },
  { left: "23%", size: 8, delay: 5, dur: 10 },
  { left: "32%", size: 5, delay: 1, dur: 12 },
  { left: "41%", size: 4, delay: 6.5, dur: 9 },
  { left: "50%", size: 7, delay: 3, dur: 11 },
  { left: "58%", size: 5, delay: 7.5, dur: 10 },
  { left: "66%", size: 4, delay: 0.8, dur: 12 },
  { left: "74%", size: 8, delay: 4.2, dur: 9 },
  { left: "82%", size: 5, delay: 8, dur: 11 },
  { left: "90%", size: 6, delay: 2, dur: 10 },
  { left: "96%", size: 4, delay: 5.8, dur: 12 },
];

/* ---------- count-up number ---------- */
const CountUp = ({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(to * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <>
      {value.toFixed(decimals)}
      {suffix}
    </>
  );
};

/* ---------- banner ---------- */
const Banner = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [tick, setTick] = useState(0);

  // Rotating headline word
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % words.length),
      2200
    );
    return () => clearInterval(id);
  }, []);

  // Live order tracker: 5 ticks per order (4 steps + a short pause on "Delivered")
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(id);
  }, []);

  const order = orders[Math.floor(tick / 5) % orders.length];
  const step = Math.min(tick % 5, 3);

  return (
    <div className="relative bg-[#FFF8F0] pb-10 sm:pb-14">
      <style>{`
        @keyframes ph-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @keyframes ph-kenburns { from { transform: scale(1); } to { transform: scale(1.14) translate(-1.5%, -1%); } }
        @keyframes ph-ember {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: .9; }
          100% { transform: translateY(-34rem) translateX(24px); opacity: 0; }
        }
        @keyframes ph-word { from { opacity: 0; transform: translateY(70%); } to { opacity: 1; transform: none; } }
        @keyframes ph-swap { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
        .ph-rise { animation: ph-rise .8s cubic-bezier(.2,.7,.2,1) both; }
        .ph-kenburns { animation: ph-kenburns 26s ease-in-out infinite alternate; }
        .ph-ember { animation: ph-ember var(--dur) linear var(--delay) infinite; }
        .ph-word { animation: ph-word .55s cubic-bezier(.2,.7,.2,1) both; }
        .ph-swap { animation: ph-swap .45s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .ph-rise, .ph-kenburns, .ph-ember, .ph-word, .ph-swap { animation: none; }
        }
      `}</style>

      {/* ---------- HERO ---------- */}
      <section className="relative isolate overflow-hidden">
        {/* Background photo with slow cinematic zoom */}
        <div className="absolute inset-0 -z-30 overflow-hidden">
          <Image
            src="/banner.jpg"
            alt="Freshly baked artisan pizza on PizzaHub"
            fill
            priority
            sizes="100vw"
            className="ph-kenburns object-cover"
          />
        </div>

        {/* Readability overlay */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-t from-neutral-950/90 via-neutral-950/65 to-neutral-950/35 md:bg-gradient-to-r md:from-neutral-950/90 md:via-neutral-950/60 md:to-neutral-950/10" />

        {/* Rising oven embers */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {embers.map((e, i) => (
            <span
              key={i}
              className="ph-ember absolute bottom-0 rounded-full bg-amber-400 shadow-[0_0_12px_3px_rgba(251,146,60,0.7)]"
              style={
                {
                  left: e.left,
                  width: e.size,
                  height: e.size,
                  "--dur": `${e.dur}s`,
                  "--delay": `${e.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="mx-auto flex min-h-[36rem] max-w-7xl items-center px-4 pb-28 pt-14 sm:min-h-[40rem] sm:px-6 sm:pb-32 sm:pt-20 lg:min-h-[44rem] lg:px-8">
          <div className="grid w-full items-center gap-10 lg:grid-cols-12">
            {/* ---------- Copy ---------- */}
            <div className="ph-rise text-center md:text-left lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                </span>
                Ovens are hot. Kitchens are open.
              </div>

              <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Real pizza.
                <br />
                Made nearby.
                <span className="mt-1 block overflow-hidden pb-2">
                  <span className="text-white">Delivered </span>
                  <span
                    key={words[wordIndex]}
                    className="ph-word inline-block bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent"
                  >
                    {words[wordIndex]}
                  </span>
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-neutral-200 sm:text-lg md:mx-0">
                Hand-stretched crusts, bold sauces and generous toppings from
                verified kitchens in your neighborhood. Pick your pie, place
                the order, and track it to your door.
              </p>

              <div className="mt-8 flex justify-center md:justify-start">
                <Link
                  href="/menu"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/40 transition duration-200 hover:-translate-y-0.5 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:w-auto"
                >
                  Browse pizza menu
                  <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Animated stats */}
              <dl className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/15 pt-6 text-center md:mx-0 md:text-left">
                <div>
                  <dt className="text-2xl font-black text-white sm:text-3xl">
                    <CountUp to={10} suffix="k+" />
                  </dt>
                  <dd className="mt-1 text-xs text-neutral-300 sm:text-sm">Orders delivered</dd>
                </div>
                <div>
                  <dt className="text-2xl font-black text-white sm:text-3xl">
                    <CountUp to={120} suffix="+" />
                  </dt>
                  <dd className="mt-1 text-xs text-neutral-300 sm:text-sm">Local kitchens</dd>
                </div>
                <div>
                  <dt className="flex items-center justify-center gap-1 text-2xl font-black text-white sm:text-3xl md:justify-start">
                    <CountUp to={4.9} decimals={1} />
                    <Star className="h-5 w-5 text-amber-400" fill="currentColor" />
                  </dt>
                  <dd className="mt-1 text-xs text-neutral-300 sm:text-sm">Average rating</dd>
                </div>
              </dl>
            </div>

            {/* ---------- Live order tracker ---------- */}
            <div className="ph-rise [animation-delay:200ms] lg:col-span-5 lg:flex lg:justify-end">
              <div className="mx-auto w-full max-w-sm rounded-3xl border border-white/20 bg-white/10 p-5 text-white shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6 lg:mx-0">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                    Live orders
                  </span>
                  <span className="text-xs text-neutral-300">Chattogram</span>
                </div>

                {/* Current order (re-animates when it changes) */}
                <div key={order.item} className="ph-swap mt-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-extrabold leading-tight sm:text-xl">
                      {order.item}
                    </p>
                    <p className="mt-1 truncate text-sm text-neutral-300">{order.who}</p>
                  </div>
                  <p className="shrink-0 text-xl font-black text-amber-300">{order.price}</p>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-300 to-red-500 transition-[width] duration-700 ease-out"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>

                  <ol className="mt-4 grid grid-cols-4 gap-1 text-center">
                    {steps.map(({ label, icon: Icon }, i) => {
                      const done = i <= step;
                      return (
                        <li key={label} className="flex flex-col items-center gap-1.5">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
                              done
                                ? "scale-100 border-transparent bg-red-600 text-white shadow-lg shadow-red-600/40"
                                : "scale-90 border-white/20 bg-white/5 text-neutral-400"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span
                            className={`text-[10px] font-medium leading-tight transition-colors duration-500 sm:text-xs ${
                              done ? "text-white" : "text-neutral-400"
                            }`}
                          >
                            {label}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PERKS BAR ---------- */}
      <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-4 sm:-mt-20 sm:px-6 lg:px-8">
        <div className="grid divide-y divide-neutral-100 overflow-hidden rounded-3xl border border-neutral-200/70 bg-white shadow-xl shadow-neutral-900/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {perks.map(({ icon: Icon, title, text, tone }) => (
            <div
              key={title}
              className="flex items-center gap-4 px-6 py-5 transition duration-200 hover:bg-[#FFF8F0]"
            >
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tone}`}>
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="text-base font-bold text-neutral-900">{title}</p>
                <p className="text-sm text-neutral-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;