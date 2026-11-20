
import { API_URL } from "./api";
import { authClient } from "./auth-client";

export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Please sign in first");
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json",
    },
  });
};
