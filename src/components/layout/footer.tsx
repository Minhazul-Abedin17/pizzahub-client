import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import CurrentYear from "./current-year";

const Footer = () => {
  return (
    <footer className="bg-[#29211D] text-white">
      <div className="mx-auto grid max-w-7xl gap-45 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <Image
            src="/logo.png"
            alt="PizzaHub"
            width={170}
            height={60}
            className="h-12 w-auto object-contain"
          />

          <p className="mt-4 max-w-xs text-sm leading-7 text-gray-300">
            Enjoy delicious and freshly baked pizzas from your favorite local
            restaurants. Good food, happy moments!
          </p>
        </div>
        {/* Support */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Customer Support</h3>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <p className="hover:text-orange-400">Contact Us</p>
            <p className="hover:text-orange-400">About Us</p>
            <p className="hover:text-orange-400">FAQ</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-lg font-bold">Get in Touch</h3>

          <div className="flex flex-col gap-4 text-sm text-gray-300">
            <p className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-400" />
              Chattogram, Bangladesh
            </p>

            <p className="flex items-center gap-3">
              <Phone size={18} className="text-orange-400" />
              +880 1234-567890
            </p>

            <p className="flex items-center gap-3">
              <Mail size={18} className="text-orange-400" />
              support@pizzahub.com
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-gray-400">
        © <CurrentYear /> PizzaHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
