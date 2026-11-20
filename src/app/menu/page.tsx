
export const instant = false;

import MenuList from "@/components/menu/menu-list";

type MenuPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

const MenuPage = async ({ searchParams }: MenuPageProps) => {
  const params = await searchParams;

  return <MenuList initialCategory={params.category || "All"} />;
};

export default MenuPage;
