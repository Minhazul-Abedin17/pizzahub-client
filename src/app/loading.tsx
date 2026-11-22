import { Flame } from "lucide-react";

// Fixed values (no Math.random) so the markup is always identical
const embers = [
  { left: "10%", size: 5, delay: 0, dur: 8 },
  { left: "24%", size: 4, delay: 2.5, dur: 10 },
  { left: "40%", size: 6, delay: 4.5, dur: 9 },
  { left: "58%", size: 4, delay: 1.2, dur: 11 },
  { left: "72%", size: 6, delay: 6, dur: 8 },
  { left: "88%", size: 5, delay: 3.2, dur: 10 },
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
];

const messages = [
  "Kneading the dough...",
  "Adding fresh toppings...",
  "Baking to perfection...",
];

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FFF8F0] px-4"
    >
      <style>{`
        @keyframes lh-spin { to { transform: rotate(360deg); } }
        @keyframes lh-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes lh-shadow { 0%,100% { transform: scaleX(1); opacity: .25; } 50% { transform: scaleX(.8); opacity: .15; } }
        @keyframes lh-bar { 0% { transform: translateX(-110%); } 100% { transform: translateX(260%); } }
        @keyframes lh-ember {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          15% { opacity: .9; }
          100% { transform: translateY(-34rem) translateX(18px); opacity: 0; }
        }
        @keyframes lh-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes lh-msg {
          0% { opacity: 0; transform: translateY(8px); }
          6%, 30% { opacity: 1; transform: none; }
          36%, 100% { opacity: 0; transform: translateY(-8px); }
        }
        .lh-spin { animation: lh-spin 6s linear infinite; }
        .lh-orbit { animation: lh-spin 2.4s linear infinite; }
        .lh-float { animation: lh-float 3.2s ease-in-out infinite; }
        .lh-shadow { animation: lh-shadow 3.2s ease-in-out infinite; }
        .lh-bar { animation: lh-bar 1.5s ease-in-out infinite; }
        .lh-ember { animation: lh-ember var(--dur) linear var(--delay) infinite; }
        .lh-rise { animation: lh-rise .7s cubic-bezier(.2,.7,.2,1) both; animation-delay: var(--d, 0s); }
        .lh-msg { animation: lh-msg 6s ease-in-out infinite; animation-delay: var(--d, 0s); opacity: 0; }
        @media (prefers-reduced-motion: reduce) {
          .lh-spin, .lh-float, .lh-shadow, .lh-ember, .lh-rise { animation: none; }
          .lh-orbit { animation-duration: 6s; }
          .lh-bar { animation: none; transform: none; width: 100%; }
          .lh-msg { animation: none; opacity: 0; }
          .lh-msg:first-child { opacity: 1; }
        }
      `}</style>

      {/* Ambient glow + dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-red-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-80 w-80 rounded-full bg-amber-400/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(#e7d5c0_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
      />

      {/* Rising embers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {embers.map((e, i) => (
          <span
            key={i}
            className="lh-ember absolute bottom-0 rounded-full bg-orange-400/90 shadow-[0_0_10px_3px_rgba(251,146,60,0.5)]"
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

      {/* Pizza loader */}
      <div className="lh-rise relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
        {/* Orbiting ring */}
        <div className="lh-orbit absolute inset-0 rounded-full border-4 border-amber-400/20 border-t-red-600" />

        {/* Orbiting dot */}
        <div className="lh-orbit absolute inset-0" aria-hidden>
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.7)]" />
        </div>

        <div className="lh-float relative h-32 w-32 sm:h-36 sm:w-36">
          <svg
            viewBox="0 0 200 200"
            className="lh-spin h-full w-full drop-shadow-[0_14px_20px_rgba(120,40,10,0.35)]"
            aria-hidden="true"
          >
            <circle cx="100" cy="100" r="94" fill="#E9A94E" />
            <circle cx="100" cy="100" r="94" fill="none" stroke="#C98428" strokeWidth="3" />
            <circle cx="100" cy="100" r="82" fill="#D9381E" />
            <circle cx="100" cy="100" r="76" fill="#FBD46B" />
            <circle
              cx="100"
              cy="100"
              r="76"
              fill="none"
              stroke="#F2B93B"
              strokeWidth="2"
              strokeDasharray="6 5"
            />
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
            {pepperoni.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="11" fill="#B8231A" />
                <circle cx={x} cy={y} r="11" fill="none" stroke="#8E170F" strokeWidth="1.5" />
                <circle cx={x - 3} cy={y - 3} r="1.6" fill="#E25A4C" />
                <circle cx={x + 3} cy={y + 2} r="1.4" fill="#E25A4C" />
              </g>
            ))}
          </svg>
        </div>

        {/* Ground shadow */}
        <div
          aria-hidden
          className="lh-shadow absolute -bottom-3 h-4 w-24 rounded-full bg-black/30 blur-md"
        />
      </div>

      {/* Brand */}
      <h2
        className="lh-rise mt-10 text-3xl font-black tracking-tight text-[#29211D] sm:text-4xl"
        style={{ "--d": "0.15s" } as React.CSSProperties}
      >
        Pizza
        <span className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 bg-clip-text text-transparent">
          Hub
        </span>
      </h2>

      <p
        className="lh-rise mt-2 text-sm text-[#29211D]/60 sm:text-base"
        style={{ "--d": "0.25s" } as React.CSSProperties}
      >
        Fresh Pizza. Happy Moments.
      </p>

      {/* Progress bar */}
      <div
        className="lh-rise mt-8 h-1.5 w-52 overflow-hidden rounded-full bg-red-100 sm:w-64"
        style={{ "--d": "0.35s" } as React.CSSProperties}
        aria-hidden
      >
        <div className="lh-bar h-full w-2/5 rounded-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400" />
      </div>

      {/* Rotating messages (CSS only) */}
      <div
        className="lh-rise relative mt-5 h-6 w-full max-w-xs text-center"
        style={{ "--d": "0.45s" } as React.CSSProperties}
      >
        {messages.map((text, i) => (
          <p
            key={text}
            className="lh-msg absolute inset-x-0 flex items-center justify-center gap-2 text-sm font-medium text-[#29211D]/60"
            style={{ "--d": `${i * 2}s` } as React.CSSProperties}
          >
            <Flame className="h-4 w-4 text-red-500" aria-hidden />
            {text}
          </p>
        ))}
      </div>

      <span className="sr-only">Loading, preparing something delicious...</span>
    </div>
  );
}