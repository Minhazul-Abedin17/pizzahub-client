
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMenuItems = async () => {
  const response = await fetch(`${API_URL}/api/menu-items`);
  return response.json();
};

export const getFeaturedItems = async () => {
  const response = await fetch(`${API_URL}/api/menu-items/featured`);
  return response.json();
};

export const getMenuItemById = async (id: string) => {
  const response = await fetch(`${API_URL}/api/menu-items/${id}`);
  return response.json();
};
