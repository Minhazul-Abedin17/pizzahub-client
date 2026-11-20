
"use client";

import { useSearchParams } from "next/navigation";
import MenuList from "./menu-list";

const MenuPageContent = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";

  return <MenuList initialCategory={category} />;
};

export default MenuPageContent;
