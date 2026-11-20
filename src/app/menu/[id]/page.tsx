
import MenuDetails from "@/components/menu/menu-details";
import { Suspense } from "react";


const DetailsPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF9F0] py-20 text-center text-gray-500">
          Loading pizza details...
        </div>
      }
    >
      <MenuDetails />
    </Suspense>
  );
};

export default DetailsPage;
