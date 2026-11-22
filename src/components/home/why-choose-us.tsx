"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Bike, Clock, HeartHandshake, Pizza, Sparkles, Truck } from "lucide-react";

/* ---------- data ---------- */
const features = [
  {
    icon: Pizza,
    title: "Fresh Ingredients",
    description: "We use fresh and quality ingredients for every pizza.",
    chip: "Fresh every day",
  },
  {
    icon: Clock,
    title: "Quick Preparation",
    description: "Your favorite pizza is prepared with care and speed.",
    chip: "Made to order",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Enjoy hot and delicious pizza delivered to your door.",
    chip: "Hot at your door",
  },
  {
    icon: HeartHandshake,
    title: "Made with Care",
    description: "Your satisfaction and happiness are always our priority.",
    chip: "Every single order",
  },
];

// Fixed values (no Math.random) so server and client render the same HTML
const embers = [
  { left: "5%", size: 5, delay: 0, dur: 10 },
  { left: "17%", size: 4, delay: 3, dur: 12 },
  { left: "31%", size: 6, delay: 5.5, dur: 11 },
  { left: "46%", size: 4, delay: 1.5, dur: 13 },
  { left: "60%", size: 6, delay: 7, dur: 10 },
  { left: "74%", size: 5, delay: 2.5, dur: 12 },
  { left: "88%", size: 4, delay: 4.5, dur: 11 },
  { left: "95%", size: 5, delay: 8, dur: 10 },
];

const STEP_TIME = 2800;

/* ---------- section ---------- */
const WhyChooseUs = () => {
  const [seen, setSeen] = useState(false);
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

  // Auto-advance (hover/focus on a card restarts the timer)
  useEffect(() => {
    if (!seen) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % features.length),
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

  const progress = (active / (features.length - 1)) * 100;

  return (
    <section className="relative isolate overflow-hidden bg-[#29211D] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
      <style>{`
        @keyframes wc-ember {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: .9; }
          100% { transform: translateY(-34rem) translateX(20px); opacity: 0; }
        }
        @keyframes wc-fill { from { width: 0; } to { width: 100%; } }
        @keyframes wc-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .wc-ember { animation: wc-ember var(--dur) linear var(--delay) infinite; }
        .wc-fill { animation: wc-fill ${STEP_TIME}ms linear both; }
        .wc-bob { animation: wc-bob 1.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wc-ember, .wc-bob { animation: none; }
          .wc-fill { animation: none; width: 100%; }
        }
      `}</style>

      {/* Ambient glow + dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-red-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-amber-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />

      {/* Rising embers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {embers.map((e, i) => (
          <span
            key={i}
            className="wc-ember absolute bottom-0 rounded-full bg-amber-400 shadow-[0_0_10px_3px_rgba(251,146,60,0.6)]"
            style={
              {
                left: e.left,
                width: e.size,
                height: e.size,
                "--dur": `${e.dur}s`,
                "--delay": `${e.delay}s`,
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
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-amber-200 backdrop-blur-md sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Our promise
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            Why you&apos;ll keep{" "}
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              coming back
            </span>
          </h2>

          <p className="mt-4 text-base leading-7 text-neutral-300 sm:text-lg">
            Great taste, fresh ingredients and friendly service in every
            order.
          </p>
        </div>

        {/* Travelling track (large screens) */}
        <div
          className={`relative mt-14 hidden h-12 lg:block ${reveal(150).className}`}
          style={reveal(150).style}
          aria-hidden
        >
          <div className="absolute inset-x-[12.5%] top-1/2 -translate-y-1/2">
            {/* Base line */}
            <div className="h-0.5 w-full rounded-full bg-white/15" />

            {/* Filled line */}
            <div
              className="absolute left-0 top-0 h-0.5 rounded-full bg-gradient-to-r from-amber-300 to-red-500 transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />

            {/* Stops */}
            {features.map((f, i) => (
              <span
                key={f.title}
                className={`absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 ${
                  i <= active
                    ? "border-red-400 bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.8)]"
                    : "border-white/20 bg-[#29211D]"
                }`}
                style={{ left: `${(i / (features.length - 1)) * 100}%` }}
              />
            ))}

            {/* Delivery bike */}
            <span
              className="absolute top-0 -translate-x-1/2 -translate-y-[170%] transition-[left] duration-700 ease-out"
              style={{ left: `${progress}%` }}
            >
              <span className="wc-bob flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/50">
                <Bike className="h-[18px] w-[18px]" />
              </span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, chip }, i) => {
            const isActive = i === active;

            return (
              <div
                key={title}
                className={reveal(250 + i * 120).className}
                style={reveal(250 + i * 120).style}
              >
                <div
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 text-center transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 sm:p-7 ${
                    isActive
                      ? "-translate-y-2 border-red-400/40 bg-white/10 shadow-2xl shadow-red-900/40"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  {/* Step number */}
                  <span
                    aria-hidden
                    className={`absolute right-5 top-3 text-5xl font-black leading-none transition-colors duration-500 ${
                      isActive ? "text-white/15" : "text-white/5"
                    }`}
                  >
                    0{i + 1}
                  </span>

                  {/* Icon */}
                  <span
                    className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${
                      isActive
                        ? "scale-110 bg-gradient-to-br from-red-600 to-orange-500 shadow-lg shadow-red-600/40"
                        : "bg-white/10 text-amber-300"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 animate-ping rounded-2xl bg-red-500/30" />
                    )}
                    <Icon className="relative h-8 w-8" />
                  </span>

                  <h3 className="mt-5 text-lg font-bold sm:text-xl">{title}</h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-neutral-300">
                    {description}
                  </p>

                  <span
                    className={`mx-auto mt-5 inline-flex rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-500 ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "bg-white/10 text-neutral-300"
                    }`}
                  >
                    {chip}
                  </span>

                  {/* Progress */}
                  {isActive && seen && (
                    <span className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                      <span
                        key={active}
                        className="wc-fill block h-full bg-gradient-to-r from-amber-300 to-red-500"
                      />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;