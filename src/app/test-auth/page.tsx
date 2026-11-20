
"use client";

import { useState } from "react";
import { authFetch } from "../lib/auth-fetch";

export default function TestAuthPage() {
  const [result, setResult] = useState("");

  const checkAuth = async () => {
    setResult("Checking...");

    try {
      const response = await authFetch("/api/me");
      const data = await response.json();

      setResult(JSON.stringify(data, null, 2));
    } catch {
      setResult("Authentication failed. Please sign in again.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 text-2xl font-bold">JWT Connection Test</h1>

      <button onClick={checkAuth}>
        Check Authentication
      </button>

      <pre className="mt-6 overflow-x-auto rounded-lg bg-neutral-900 p-5 text-sm text-white">
        {result || "Click the button to test your JWT connection."}
      </pre>
    </div>
  );
}
