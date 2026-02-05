"use client";

import { Suspense } from "react";
import { VerifyContent } from "./VerifyContent";

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-white/5 px-8 py-12 text-center backdrop-blur-xl">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
