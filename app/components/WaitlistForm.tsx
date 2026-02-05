"use client";

import { useState } from "react";
import { addToWaitlist } from "@/lib/waitlist";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus("error");
      setErrorMessage("Email is required");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const result = await addToWaitlist(trimmedEmail);

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        placeholder="your@email.com"
        disabled={status === "loading"}
        className="w-full rounded-lg border border-zinc-700/50 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none backdrop-blur-sm transition focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50"
      />
      
      {errorMessage && (
        <p className="text-left text-xs text-zinc-400">{errorMessage}</p>
      )}

      {status === "success" ? (
        <div className="rounded-lg border border-cyan-500/50 bg-cyan-500/10 p-4 text-center">
          <p className="text-sm font-medium text-cyan-300">
            Check your inbox for verification email
          </p>
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-cyan-500/20 px-6 py-3 text-sm font-medium uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50"
        >
          {status === "loading" ? "Orchestrating..." : "BREAK THE GATE"}
        </button>
      )}
    </form>
  );
}
