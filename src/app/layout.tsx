import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "PizzaHub - Fresh Pizza Delivered",
  description: "Order delicious and fresh pizza with PizzaHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FFF9F0] text-[#29211D]">
        <Navbar />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="custom-toast"
          progressClassName="custom-toast-progress"
        />
        <Footer />
      </body>
    </html>
  );
}
