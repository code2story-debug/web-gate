"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ComingSoonLanding() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

    const { error } = await supabase.from("waitlist").insert({ email: trimmedEmail });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    
    setStatus("success");
    setEmail("");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12">
      {/* Ambient blur effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      {/* Glass-morphism card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-cyan-500/30 bg-white/5 px-8 py-12 text-center backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.15),inset_0_0_60px_rgba(6,182,212,0.05)]">
        <h1 className="mb-3 text-2xl font-semibold tracking-[0.25em] text-white sm:text-3xl">
          THE GATE IS OPENING
        </h1>
        <p className="mb-10 text-sm leading-relaxed text-zinc-400 sm:text-base">
          Stop coding. Start orchestrating. Volume 3 is the new era.
        </p>

        {status === "success" ? (
          <p className="text-cyan-300/90 text-sm font-medium tracking-wide sm:text-base">
            Access Requested. Watch your inbox, Orchestrator.
          </p>
        ) : (
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
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-cyan-500/20 px-6 py-3 text-sm font-medium uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50"
            >
              {status === "loading" ? "Orchestrating..." : "BREAK THE GATE"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
