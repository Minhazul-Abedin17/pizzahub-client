"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  Clock,
  Flame,
  Leaf,
  MapPin,
  MessageSquare,
  Minus,
  MousePointerClick,
  PackageCheck,
  Pizza,
  Plus,
  Sparkles,
} from "lucide-react";

/* ---------- data ---------- */
const words = ["pizza lovers.", "busy days.", "late nights.", "family time."];

const features = [
  {
    icon: Leaf,
    title: "Real ingredients",
    text: "Fresh toppings, real cheese and slow-simmered sauce in every bite.",
  },
  {
    icon: MousePointerClick,
    title: "Order in seconds",
    text: "Pick your pizza, set the quantity and place your order in a few taps.",
  },
  {
    icon: CalendarClock,
    title: "Delivery on your time",
    text: "Choose a delivery date, add your address and leave a note for the kitchen.",
  },
  {
    icon: PackageCheck,
    title: "Follow your order",
    text: "See when the kitchen accepts it and when it reaches your door.",
  },
];

const ingredients = [
  { emoji: "🍅", name: "Tomato" },
  { emoji: "🧀", name: "Mozzarella" },
  { emoji: "🌿", name: "Basil" },
  { emoji: "🍄", name: "Mushroom" },
  { emoji: "🌶️", name: "Chili" },
  { emoji: "🥓", name: "Pepperoni" },
];

const trackSteps = [
  { icon: Clock, label: "Pending", sub: "Waiting for the kitchen" },
  { icon: Flame, label: "Accepted", sub: "Your pizza is being baked" },
  { icon: PackageCheck, label: "Delivered", sub: "Enjoy your meal" },
];

// Fixed values (no Math.random) so server and client render the same HTML
const embers = [
  { left: "8%", size: 5, delay: 0, dur: 9 },
  { left: "22%", size: 4, delay: 3, dur: 11 },
  { left: "38%", size: 6, delay: 5, dur: 10 },
  { left: "55%", size: 4, delay: 1.5, dur: 12 },
  { left: "70%", size: 6, delay: 6.5, dur: 9 },
  { left: "86%", size: 5, delay: 2.5, dur: 11 },
];

const DURATION = 4200;

/* ---------- panel visuals (re-mounted on each change so animations replay) ---------- */
const IngredientsVisual = () => (
  <div className="flex w-full flex-col items-center">
    <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
      <span className="absolute inset-0 animate-ping rounded-full bg-red-500/20" />
      <span className="absolute inset-2 rounded-full bg-gradient-to-br from-red-600 to-orange-500 shadow-2xl shadow-red-600/40" />
      <Pizza className="relative h-12 w-12 text-white sm:h-14 sm:w-14" />
    </div>

    <div className="mt-8 flex max-w-sm flex-wrap justify-center gap-2.5">
      {ingredients.map((item, i) => (
        <span
          key={item.name}
          className="fs-pop"
          style={{ "--d": `${0.15 + i * 0.12}s` } as React.CSSProperties}
        >
          <span
            className="fs-float inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm font-semibold text-white backdrop-blur-sm"
            style={{ "--fd": `${i * 0.4}s` } as React.CSSProperties}
          >
            <span aria-hidden>{item.emoji}</span>
            {item.name}
          </span>
        </span>
      ))}
    </div>
  </div>
);

const OrderVisual = () => (
  <div className="w-full max-w-xs">
    <div className="fs-slide rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/40">
          <Pizza className="h-7 w-7" />
        </span>
        <div className="flex-1 space-y-2">
          <span className="block h-3 w-3/4 rounded-full bg-white/30" />
          <span className="block h-2.5 w-1/2 rounded-full bg-white/15" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-black/20 px-3 py-2.5">
        <span className="text-xs font-medium text-neutral-300">Quantity</span>
        <span className="flex items-center gap-3 text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
            <Minus className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-bold">2</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600">
            <Plus className="h-3.5 w-3.5" />
          </span>
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-300">Total</span>
        <span className="h-3 w-16 rounded-full bg-white/30" />
      </div>
    </div>

    <div className="fs-pulse mt-4 flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-orange-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/40">
      Place order
    </div>

    <div
      className="fs-pop mx-auto mt-4 flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-900/30"
      style={{ "--d": "1.6s" } as React.CSSProperties}
    >
      <Sparkles className="h-4 w-4" />
      Order placed
    </div>
  </div>
);

const ScheduleVisual = () => (
  <div className="w-full max-w-xs space-y-3">
    <div
      className="fs-slide flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md"
      style={{ "--d": "0.1s" } as React.CSSProperties}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
        <CalendarClock className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-neutral-300">Delivery date</p>
        <p className="truncate text-sm font-bold text-white">Tomorrow, 7:30 PM</p>
      </div>
    </div>

    <div
      className="fs-slide flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md"
      style={{ "--d": "0.4s" } as React.CSSProperties}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-300">
        <MapPin className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-neutral-300">Delivery address</p>
        <p className="truncate text-sm font-bold text-white">Home · Chattogram</p>
      </div>
    </div>

    <div
      className="fs-slide flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md"
      style={{ "--d": "0.7s" } as React.CSSProperties}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-300">
        <MessageSquare className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-neutral-300">Note for the kitchen</p>
        <p className="mt-0.5 text-sm font-bold text-white">
          <span className="fs-type inline-block overflow-hidden whitespace-nowrap align-bottom">
            Extra cheese, please!
          </span>
          <span className="fs-blink ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-amber-300" />
        </p>
      </div>
    </div>
  </div>
);

const TrackVisual = () => (
  <ol className="w-full max-w-xs">
    {trackSteps.map(({ icon: Icon, label, sub }, i) => {
      const last = i === trackSteps.length - 1;
      return (
        <li key={label} className="relative flex gap-4 pb-8 last:pb-0">
          {/* connector */}
          {!last && (
            <span className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 overflow-hidden rounded-full bg-white/15">
              <span
                className="fs-fillv block w-full bg-gradient-to-b from-red-500 to-orange-400"
                style={{ "--d": `${0.7 + i * 1.2}s` } as React.CSSProperties}
              />
            </span>
          )}

          <span
            className="fs-lit relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-neutral-400"
            style={{ "--d": `${0.3 + i * 1.2}s` } as React.CSSProperties}
          >
            <Icon className="h-5 w-5" />
          </span>

          <div className="pt-0.5">
            <p
              className="fs-text text-base font-bold text-white"
              style={{ "--d": `${0.3 + i * 1.2}s` } as React.CSSProperties}
            >
              {label}
            </p>
            <p className="text-sm text-neutral-300">{sub}</p>
          </div>
        </li>
      );
    })}
  </ol>
);

const visuals = [IngredientsVisual, OrderVisual, ScheduleVisual, TrackVisual];

/* ---------- section ---------- */
const FeatureSection = () => {
  const [seen, setSeen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reveal + start autoplay when the section scrolls into view
  useEffect(() => {
    const node = sectionRef.current;
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

  // Rotating headline word
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % words.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  // Auto-advance features (clicking one restarts the timer)
  useEffect(() => {
    if (!seen) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % features.length),
      DURATION
    );
    return () => clearTimeout(id);
  }, [active, seen]);

  const Visual = visuals[active];

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
      <style>{`
        @keyframes fs-pop { 0% { opacity: 0; transform: scale(.5); } 70% { transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes fs-slide { from { opacity: 0; transform: translateX(22px); } to { opacity: 1; transform: none; } }
        @keyframes fs-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes fs-fill { from { width: 0; } to { width: 100%; } }
        @keyframes fs-fillv { from { height: 0; } to { height: 100%; } }
        @keyframes fs-word { from { opacity: 0; transform: translateY(70%); } to { opacity: 1; transform: none; } }
        @keyframes fs-ember {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: .9; }
          100% { transform: translateY(-30rem) translateX(18px); opacity: 0; }
        }
        @keyframes fs-type { from { max-width: 0; } to { max-width: 24ch; } }
        @keyframes fs-blink { 50% { opacity: 0; } }
        @keyframes fs-lit { to { background: #dc2626; color: #fff; box-shadow: 0 8px 20px rgba(220,38,38,.45); } }
        @keyframes fs-text { from { opacity: .45; } to { opacity: 1; } }
        @keyframes fs-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }

        .fs-pop { display: inline-block; animation: fs-pop .5s cubic-bezier(.2,.8,.3,1) both; animation-delay: var(--d, 0s); }
        .fs-slide { animation: fs-slide .6s cubic-bezier(.2,.7,.2,1) both; animation-delay: var(--d, 0s); }
        .fs-float { animation: fs-float 4s ease-in-out infinite; animation-delay: var(--fd, 0s); }
        .fs-fill { animation: fs-fill ${DURATION}ms linear both; }
        .fs-fillv { animation: fs-fillv 1.2s ease-out both; animation-delay: var(--d, 0s); }
        .fs-word { animation: fs-word .55s cubic-bezier(.2,.7,.2,1) both; }
        .fs-ember { animation: fs-ember var(--dur) linear var(--delay) infinite; }
        .fs-type { max-width: 0; animation: fs-type 1.8s steps(21) .9s both; }
        .fs-blink { animation: fs-blink 1s step-end infinite; }
        .fs-lit { animation: fs-lit .5s ease-out both; animation-delay: var(--d, 0s); }
        .fs-text { animation: fs-text .5s ease-out both; animation-delay: var(--d, 0s); }
        .fs-pulse { animation: fs-pulse 1.4s ease-in-out .5s 2; }

        @media (prefers-reduced-motion: reduce) {
          .fs-pop, .fs-slide, .fs-float, .fs-word, .fs-ember, .fs-blink, .fs-text, .fs-pulse { animation: none; }
          .fs-fill { animation: none; width: 100%; }
          .fs-fillv { animation: none; height: 100%; }
          .fs-type { animation: none; max-width: none; }
          .fs-lit { animation: none; background: #dc2626; color: #fff; }
        }
      `}</style>

      {/* Ambient glow + dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 -z-10 h-80 w-80 rounded-full bg-red-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(#e7d5c0_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]"
      />

      <div ref={sectionRef} className="mx-auto max-w-7xl">
        {/* Heading */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white px-4 py-1.5 text-xs font-semibold text-red-600 shadow-2xs sm:text-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            Why PizzaHub
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-[#29211D] sm:text-4xl lg:text-5xl">
            Made for
            <span className="block overflow-hidden pb-2">
              <span
                key={words[wordIndex]}
                className="fs-word inline-block bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent"
              >
                {words[wordIndex]}
              </span>
            </span>
          </h2>

          <p className="mt-2 text-base leading-7 text-neutral-600 sm:text-lg">
            Everything you need to go from hungry to happy, simple from the
            first tap to the last bite.
          </p>
        </div>

        {/* Showcase */}
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Tabs */}
          <ol
            className={`space-y-3 transition-all duration-700 ease-out lg:col-span-5 ${
              seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "120ms" }}
          >
            {features.map(({ icon: Icon, title, text }, i) => {
              const isActive = i === active;
              return (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={`relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFF8F0] sm:p-5 ${
                      isActive
                        ? "border-red-200 bg-white shadow-xl shadow-red-900/10"
                        : "border-transparent bg-white/60 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-red-600 to-orange-500 text-white shadow-lg shadow-red-600/30"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 animate-ping rounded-xl bg-red-500/30" />
                      )}
                      <Icon className="relative h-6 w-6" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-bold text-[#29211D] sm:text-lg">
                        {title}
                      </span>
                      <span
                        className={`grid transition-all duration-500 ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden pt-1 text-sm leading-6 text-neutral-600">
                          {text}
                        </span>
                      </span>
                    </span>

                    {/* Progress */}
                    {isActive && seen && (
                      <span className="absolute inset-x-0 bottom-0 h-1 bg-red-100">
                        <span
                          key={active}
                          className="fs-fill block h-full bg-gradient-to-r from-red-500 to-amber-400"
                        />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Panel */}
          <div
            className={`transition-all duration-700 ease-out lg:col-span-7 ${
              seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "240ms" }}
          >
            <div className="relative isolate flex h-[26rem] flex-col overflow-hidden rounded-3xl bg-[#29211D] text-white shadow-2xl shadow-red-900/20 sm:h-[28rem] lg:h-full lg:min-h-[28rem]">
              {/* Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 -z-10 h-72 w-72 rounded-full bg-red-600/30 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-16 -z-10 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl"
              />

              {/* Rising embers */}
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                {embers.map((e, i) => (
                  <span
                    key={i}
                    className="fs-ember absolute bottom-0 rounded-full bg-amber-400 shadow-[0_0_10px_3px_rgba(251,146,60,0.6)]"
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

              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="flex items-center gap-1.5" aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  {features[active].title}
                </span>
              </div>

              {/* Visual (key re-mounts it so its animation replays) */}
              <div
                key={active}
                className="flex flex-1 items-center justify-center overflow-hidden p-5 sm:p-8"
              >
                <Visual />
              </div>

              {/* Step dots */}
              <div className="flex justify-center gap-1.5 pb-5">
                {features.map((f, i) => (
                  <span
                    key={f.title}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-6 bg-white" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;