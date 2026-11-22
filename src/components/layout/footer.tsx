import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Flame,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";
import CurrentYear from "./current-year";

/* ---------- data ---------- */
// Static items: shown only, not clickable
const supportItems = [
  "Contact Us",
  "About Us",
  "FAQ",
  "Privacy Policy",
  "Terms & Conditions",
];

const highlights = [
  { icon: Flame, label: "Baked fresh" },
  { icon: Truck, label: "Delivered hot" },
  { icon: ShieldCheck, label: "Verified kitchens" },
];

const contacts = [
  {
    icon: MapPin,
    text: "Chattogram, Bangladesh",
    href: "https://www.google.com/maps/search/?api=1&query=Chattogram+Bangladesh",
  },
  { icon: Phone, text: "+880 1234-567890", href: "tel:+8801234567890" },
  { icon: Mail, text: "support@pizzahub.com", href: "mailto:support@pizzahub.com" },
];

/* Inline SVG icons (static, no links) */
const socials = [
  {
    label: "Facebook",
    svg: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    label: "Instagram",
    svg: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "YouTube",
    svg: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <polygon points="10 9 15 12 10 15 10 9" />
      </>
    ),
  },
];

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-5 text-base font-bold">
    {children}
    <span className="mt-2 block h-0.5 w-8 rounded-full bg-gradient-to-r from-red-500 to-amber-400" />
  </h3>
);

/* ---------- footer ---------- */
const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-[#29211D] text-white">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-80 w-80 rounded-full bg-red-600/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
      />

      {/* ---------- Banner card (static) ---------- */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-orange-500 px-6 py-10 shadow-2xl shadow-red-900/30 sm:px-10 sm:py-12">
          <Flame
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rotate-12 text-white/10 sm:h-56 sm:w-56"
          />

          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                Hungry? Your pizza is
                <br className="hidden sm:block" /> just a few taps away.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-red-50 sm:text-base">
                Fresh from verified local kitchens, baked to order and
                delivered hot to your door.
              </p>
            </div>

            <ul className="flex flex-wrap justify-center gap-3 md:max-w-xs md:justify-end">
              {highlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm"
                >
                  <Icon className="h-4 w-4 text-amber-200" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- Main columns ---------- */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Brand */}
        <div className="md:col-span-2 lg:col-span-5">
          <Link href="/" aria-label="PizzaHub home" className="inline-block">
            <Image
              src="/logo.png"
              alt="PizzaHub"
              width={170}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-300">
            Enjoy delicious and freshly baked pizzas from your favorite local
            restaurants. Good food, happy moments!
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-200 sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <Clock className="h-4 w-4 text-amber-300" />
            Open daily · 10 AM – 11 PM
          </div>

          {/* Static social icons (not clickable) */}
          <div className="mt-6 flex items-center gap-3">
            {socials.map((s) => (
              <span
                key={s.label}
                role="img"
                aria-label={s.label}
                className="flex h-11 w-11 cursor-default items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {s.svg}
                </svg>
              </span>
            ))}
          </div>
        </div>

        {/* Support (static list) */}
        <div className="lg:col-span-3 lg:col-start-7">
          <Heading>Support</Heading>
          <ul className="flex flex-col gap-3">
            {supportItems.map((item) => (
              <li
                key={item}
                className="flex cursor-default items-center gap-2.5 text-sm text-neutral-300"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-red-500 to-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <Heading>Get in Touch</Heading>
          <ul className="flex flex-col gap-4">
            {contacts.map(({ icon: Icon, text, href }) => (
              <li key={text}>
                <a
                  href={href}
                  className="group flex items-center gap-3 text-sm text-neutral-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:text-white"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-amber-300 transition-colors duration-200 group-hover:bg-red-600 group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 break-words">{text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-sm text-neutral-400 sm:px-6 md:flex-row lg:px-8">
          <p>
            © <CurrentYear /> PizzaHub. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> in
            Chattogram
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;