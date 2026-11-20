
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: string;
  status: string;
  isActive: boolean;
  isFeatured: boolean;
};

type MenuFilters = {
  search?: string;
  category?: string;
  location?: string;
  sort?: string;
};

export const getMenuItems = async (
  filters: MenuFilters = {}
): Promise<MenuItem[]> => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.location) params.set("location", filters.location);
  if (filters.sort) params.set("sort", filters.sort);

  const response = await fetch(
    `${API_URL}/api/menu-items?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) return [];

  return response.json();
};

export const getFeaturedItems = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${API_URL}/api/menu-items/featured`, {
    cache: "no-store",
  });

  if (!response.ok) return [];

  return response.json();
};

export const getMenuCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/menu-items/categories`, {
    cache: "no-store",
  });

  if (!response.ok) return [];

  return response.json();
};

export const getMenuItemById = async (
  id: string
): Promise<MenuItem | null> => {
  const response = await fetch(`${API_URL}/api/menu-items/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) return null;

  return response.json();
};
