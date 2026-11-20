
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

  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${data.token}`);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
};
