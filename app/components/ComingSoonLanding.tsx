"use client";

import { WaitlistForm } from "./WaitlistForm";

export function ComingSoonLanding() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12">
      {/* Ambient blur effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] gate-glow" />
        <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] gate-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Glass-morphism card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-cyan-500/30 bg-white/5 px-8 py-12 text-center backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.15),inset_0_0_60px_rgba(6,182,212,0.05)]">
        <h1 className="mb-6 text-2xl font-semibold tracking-[0.25em] text-white sm:text-3xl">
          THE GATE IS OPENING
        </h1>

        <WaitlistForm />
      </div>
    </div>
  );
}
