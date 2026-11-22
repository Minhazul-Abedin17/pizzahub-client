"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Beef,
  ChefHat,
  Fish,
  Flame,
  Leaf,
  Pizza,
} from "lucide-react";

/* ---------- data ---------- */
const words = ["perfect slice", "next craving", "favorite flavor", "comfort food"];

const categories = [
  {
    name: "Classic",
    icon: Pizza,
    tagline: "Timeless favorites",
    tone: "bg-red-50 text-red-600",
  },
  {
    name: "Chicken",
    icon: Beef,
    tagline: "Juicy & loaded",
    tone: "bg-amber-50 text-amber-600",
  },
  {
    name: "Vegetarian",
    icon: Leaf,
    tagline: "Fresh & green",
    tone: "bg-emerald-50 text-emerald-600",
  },
  {
    name: "Spicy",
    icon: Flame,
    tagline: "Bring the heat",
    tone: "bg-orange-50 text-orange-600",
  },
  {
    name: "Seafood",
    icon: Fish,
    tagline: "Ocean-fresh toppings",
    tone: "bg-sky-50 text-sky-600",
  },
  {
    name: "Special",
    icon: ChefHat,
    tagline: "Chef's creations",
    tone: "bg-rose-50 text-rose-600",
  },
];

// Fixed values (no Math.random) so server and client render the same HTML
const sparks = [
  { left: "7%", size: 5, delay: 0, dur: 11 },
  { left: "20%", size: 4, delay: 3.5, dur: 13 },
  { left: "36%", size: 6, delay: 6, dur: 12 },
  { left: "52%", size: 4, delay: 1.5, dur: 14 },
  { left: "67%", size: 6, delay: 8, dur: 11 },
  { left: "82%", size: 5, delay: 4.5, dur: 13 },
  { left: "93%", size: 4, delay: 2.5, dur: 12 },
];

const STEP_TIME = 2600;

/* ---------- section ---------- */
const Categories = () => {
  const [seen, setSeen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Reveal + start autoplay when the section scrolls into view
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Rotating headline words
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % words.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  // Auto-spotlight each category in turn (hover/focus restarts the timer)
  useEffect(() => {
    if (!seen) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % categories.length),
      STEP_TIME
    );
    return () => clearTimeout(id);
  }, [active, seen]);

  const reveal = (delay: number) => ({
    className: `transition-all duration-700 ease-out ${
      seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` } as CSSProperties,
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <style>{`
        @keyframes ct-word { from { opacity: 0; transform: translateY(70%); } to { opacity: 1; transform: none; } }
        @keyframes ct-fill { from { width: 0; } to { width: 100%; } }
        @keyframes ct-spark {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: .8; }
          100% { transform: translateY(-30rem) translateX(16px); opacity: 0; }
        }
        @keyframes ct-shine { from { transform: translateX(-140%) skewX(-20deg); } to { transform: translateX(340%) skewX(-20deg); } }
        @keyframes ct-wiggle { 0%,100% { transform: rotate(0) scale(1.1); } 25% { transform: rotate(-8deg) scale(1.15); } 75% { transform: rotate(8deg) scale(1.15); } }
        .ct-word { animation: ct-word .55s cubic-bezier(.2,.7,.2,1) both; }
        .ct-fill { animation: ct-fill ${STEP_TIME}ms linear both; }
        .ct-spark { animation: ct-spark var(--dur) linear var(--delay) infinite; }
        .ct-shine { animation: ct-shine 3.2s ease-in-out 1s infinite; }
        .ct-wiggle { animation: ct-wiggle .7s ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .ct-word, .ct-spark, .ct-shine, .ct-wiggle { animation: none; }
          .ct-fill { animation: none; width: 100%; }
        }
      `}</style>

      {/* Ambient glow + dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(#e7d5c0_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
      />

      {/* Rising sparks */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="ct-spark absolute bottom-0 rounded-full bg-orange-400/80 shadow-[0_0_10px_3px_rgba(251,146,60,0.45)]"
            style={
              {
                left: s.left,
                width: s.size,
                height: s.size,
                "--dur": `${s.dur}s`,
                "--delay": `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div ref={ref} className="mx-auto max-w-7xl">
        {/* Heading */}
        <div
          className={`mx-auto max-w-2xl text-center ${reveal(0).className}`}
          style={reveal(0).style}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white px-4 py-1.5 text-xs font-semibold text-red-600 shadow-2xs sm:text-sm">
            <Pizza className="h-4 w-4" />
            Explore our menu
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-[#29211D] sm:text-4xl lg:text-5xl">
            Find your
            <span className="block overflow-hidden pb-2">
              <span
                key={words[wordIndex]}
                className="ct-word inline-block bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent"
              >
                {words[wordIndex]}
              </span>
            </span>
          </h2>

          <p className="mt-2 text-base leading-7 text-neutral-600 sm:text-lg">
            Pick a category and discover freshly baked pizzas from the best
            local kitchens.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {categories.map(({ name, icon: Icon, tagline, tone }, i) => {
            const isActive = i === active;
            const r = reveal(150 + i * 100);

            return (
              // Outer wrapper handles the scroll reveal so hover transitions stay instant
              <div key={name} className={r.className} style={r.style}>
                <Link
                  href={`/menu?category=${encodeURIComponent(name)}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border bg-white px-3 py-7 text-center transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F0] sm:px-4 sm:py-8 ${
                    isActive
                      ? "-translate-y-2 border-red-200 shadow-xl shadow-red-900/10"
                      : "border-neutral-200/70 shadow-sm"
                  }`}
                >
                  {/* Active wash */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 bg-gradient-to-b from-red-50/0 to-red-50 transition duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Shine sweep on the active card */}
                  {isActive && seen && (
                    <span
                      aria-hidden
                      className="ct-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-red-200/40 to-transparent"
                    />
                  )}

                  {/* Icon tile */}
                  <span
                    key={isActive ? `on-${name}` : `off-${name}`}
                    className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl transition duration-300 ${
                      isActive
                        ? "ct-wiggle bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/30"
                        : tone
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 animate-ping rounded-2xl bg-red-500/25" />
                    )}
                    <Icon className="relative h-8 w-8" />
                  </span>

                  <h3 className="relative z-10 mt-5 text-base font-bold text-[#29211D] sm:text-lg">
                    {name}
                  </h3>
                  <p className="relative z-10 mt-1 flex-1 text-xs text-neutral-500 sm:text-sm">
                    {tagline}
                  </p>

                  {/* Arrow: shows on the active card */}
                  <span
                    className={`relative z-10 mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full transition duration-300 ${
                      isActive
                        ? "translate-y-0 bg-red-600 text-white opacity-100"
                        : "translate-y-1 bg-neutral-100 text-neutral-500 opacity-60"
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>

                  {/* Progress */}
                  {isActive && seen && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-red-100">
                      <span
                        key={active}
                        className="ct-fill block h-full bg-gradient-to-r from-red-500 to-amber-400"
                      />
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div
          className={`mt-12 flex justify-center ${reveal(150 + categories.length * 100).className}`}
          style={reveal(150 + categories.length * 100).style}
        >
          <Link
            href="/menu"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-red-600/30 transition duration-200 hover:-translate-y-0.5 hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F0]"
          >
            <span
              aria-hidden
              className="ct-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
            <span className="relative">View full menu</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;