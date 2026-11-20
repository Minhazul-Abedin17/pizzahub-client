
import MenuPageContent from "@/components/menu/menu-page-content";
import { Suspense } from "react";


const MenuPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF9F0] py-20 text-center text-gray-500">
          Loading menu...
        </div>
      }
    >
      <MenuPageContent />
    </Suspense>
  );
};

export default MenuPage;
