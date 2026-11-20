
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: string;
  isActive: boolean;
  isFeatured: boolean;
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${API_URL}/api/menu-items`, {
    cache: "no-store",
  });

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

export const getMenuItemById = async (
  id: string
): Promise<MenuItem | null> => {
  const response = await fetch(`${API_URL}/api/menu-items/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) return null;

  return response.json();
};
