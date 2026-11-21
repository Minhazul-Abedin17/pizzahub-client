

import { API_URL } from "./api";
import { authClient } from "./auth-client";

export const authFetch = async (
  path: string,
  options: RequestInit = {}
) => {
  if (!API_URL) {
    throw new Error("API URL is missing. Check your frontend .env.local file.");
  }

  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Please login first");
  }

  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${data.token}`);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  console.log("API Request:", `${API_URL}${path}`);

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  console.log("API Response Status:", response.status);

  return response;
};
