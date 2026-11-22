"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Sparkles } from "lucide-react";

/* ---------- data ---------- */
const words = ["delicious?", "cheesy?", "spicy?", "crispy?"];

// Fixed values (no Math.random) so server and client render the same HTML
const embers = [
  { left: "6%", size: 5, delay: 0, dur: 9 },
  { left: "18%", size: 4, delay: 3, dur: 11 },
  { left: "32%", size: 6, delay: 5, dur: 10 },
  { left: "47%", size: 4, delay: 1.5, dur: 12 },
  { left: "61%", size: 6, delay: 6.5, dur: 9 },
  { left: "75%", size: 5, delay: 2.5, dur: 11 },
  { left: "88%", size: 4, delay: 4.2, dur: 10 },
];

const pepperoni = [
  [100, 52],
  [141, 70],
  [150, 112],
  [122, 150],
  [76, 148],
  [50, 108],
  [62, 68],
  [100, 100],
  [124, 98],
  [82, 124],
];

const basil = [
  [84, 76, -30],
  [128, 128, 40],
  [66, 100, 70],
  [116, 74, 15],
];

/* ---------- section ---------- */
const OrderPromo = () => {
  const [seen, setSeen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Reveal when the section scrolls into view
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
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Rotating headline word
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % words.length),
      2300
    );
    return () => clearInterval(id);
  }, []);

  const reveal = (delay: number) => ({
    className: `transition-all duration-700 ease-out ${
      seen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF8F0] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <style>{`
        @keyframes op-spin { to { transform: rotate(360deg); } }
        @keyframes op-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes op-word { from { opacity: 0; transform: translateY(70%); } to { opacity: 1; transform: none; } }
        @keyframes op-shine { from { transform: translateX(-140%) skewX(-20deg); } to { transform: translateX(340%) skewX(-20deg); } }
        @keyframes op-ember {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: .9; }
          100% { transform: translateY(-26rem) translateX(18px); opacity: 0; }
        }
        .op-spin { animation: op-spin 40s linear infinite; }
        .op-float { animation: op-float 5s ease-in-out infinite; animation-delay: var(--fd, 0s); }
        .op-word { animation: op-word .55s cubic-bezier(.2,.7,.2,1) both; }
        .op-shine { animation: op-shine 3.2s ease-in-out 1s infinite; }
        .op-ember { animation: op-ember var(--dur) linear var(--delay) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .op-spin, .op-float, .op-word, .op-shine, .op-ember { animation: none; }
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

      <div ref={ref} className="mx-auto max-w-7xl">
        <div
          className={`relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-700 via-red-600 to-orange-500 shadow-2xl shadow-red-900/30 ${reveal(0).className}`}
          style={reveal(0).style}
        >
          {/* Dotted texture inside card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_right,black,transparent_70%)]"
          />

          {/* Glow behind pizza */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-amber-300/40 blur-3xl"
          />

          {/* Rising embers */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {embers.map((e, i) => (
              <span
                key={i}
                className="op-ember absolute bottom-0 rounded-full bg-amber-200 shadow-[0_0_10px_3px_rgba(253,230,138,0.7)]"
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

          <div className="grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-16">
            {/* Copy */}
            <div
              className={`text-center text-white lg:col-span-7 lg:text-left ${reveal(150).className}`}
              style={reveal(150).style}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-md sm:text-sm">
                <Sparkles className="h-4 w-4 text-amber-200" />
                Your pizza moment
              </span>

              <h2 className="mt-5 text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Craving something
                <span className="block overflow-hidden pb-2">
                  <span
                    key={words[wordIndex]}
                    className="op-word inline-block text-amber-200"
                  >
                    {words[wordIndex]}
                  </span>
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-red-50 sm:text-lg lg:mx-0">
                Explore our menu and find the perfect pizza for your next
                meal. Baked fresh, delivered hot.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <Link
                  href="/menu"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-red-600 shadow-xl shadow-red-950/30 transition duration-200 hover:-translate-y-0.5 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-600 sm:w-auto"
                >
                  {/* Shine sweep */}
                  <span
                    aria-hidden
                    className="op-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 bg-gradient-to-r from-transparent via-red-200/60 to-transparent"
                  />
                  <span className="relative">Order Your Pizza</span>
                  <ArrowRight className="relative h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Pizza visual */}
            <div
              className={`relative mx-auto flex w-full max-w-[17rem] items-center justify-center sm:max-w-sm lg:col-span-5 lg:max-w-none ${reveal(300).className}`}
              style={reveal(300).style}
            >
              {/* Ground shadow */}
              <div
                aria-hidden
                className="absolute bottom-0 h-6 w-3/4 rounded-full bg-black/25 blur-xl"
              />

              <div className="op-float relative aspect-square w-full">
                <svg
                  viewBox="0 0 200 200"
                  className="op-spin h-full w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
                  role="img"
                  aria-label="A freshly baked pepperoni pizza"
                >
                  {/* Crust */}
                  <circle cx="100" cy="100" r="94" fill="#E9A94E" />
                  <circle cx="100" cy="100" r="94" fill="none" stroke="#C98428" strokeWidth="3" />
                  {/* Sauce */}
                  <circle cx="100" cy="100" r="82" fill="#D9381E" />
                  {/* Cheese */}
                  <circle cx="100" cy="100" r="76" fill="#FBD46B" />
                  <circle cx="100" cy="100" r="76" fill="none" stroke="#F2B93B" strokeWidth="2" strokeDasharray="6 5" />

                  {/* Slice lines */}
                  {[0, 45, 90, 135].map((deg) => (
                    <line
                      key={deg}
                      x1="100"
                      y1="24"
                      x2="100"
                      y2="176"
                      stroke="rgba(160,70,20,0.35)"
                      strokeWidth="1.5"
                      transform={`rotate(${deg} 100 100)`}
                    />
                  ))}

                  {/* Basil */}
                  {basil.map(([x, y, r], i) => (
                    <ellipse
                      key={i}
                      cx={x}
                      cy={y}
                      rx="9"
                      ry="4.5"
                      fill="#2E8B4A"
                      transform={`rotate(${r} ${x} ${y})`}
                    />
                  ))}

                  {/* Pepperoni */}
                  {pepperoni.map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r="11" fill="#B8231A" />
                      <circle cx={x} cy={y} r="11" fill="none" stroke="#8E170F" strokeWidth="1.5" />
                      <circle cx={x - 3} cy={y - 3} r="1.6" fill="#E25A4C" />
                      <circle cx={x + 3} cy={y + 2} r="1.4" fill="#E25A4C" />
                    </g>
                  ))}
                </svg>

                {/* Floating chips */}
                <div
                  className="op-float absolute -left-2 top-[8%] flex items-center gap-2 rounded-2xl border border-white/40 bg-white/90 px-3 py-2 shadow-xl backdrop-blur-md sm:-left-6 sm:px-4 sm:py-2.5"
                  style={{ "--fd": "0.6s" } as React.CSSProperties}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 sm:h-9 sm:w-9">
                    <Flame className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="text-xs font-bold text-neutral-900 sm:text-sm">
                    Baked fresh
                  </span>
                </div>

                <div
                  className="op-float absolute -right-2 bottom-[10%] flex items-center gap-2 rounded-2xl border border-white/40 bg-white/90 px-3 py-2 shadow-xl backdrop-blur-md sm:-right-6 sm:px-4 sm:py-2.5"
                  style={{ "--fd": "1.8s" } as React.CSSProperties}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 sm:h-9 sm:w-9">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="text-xs font-bold text-neutral-900 sm:text-sm">
                    Served hot
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderPromo;