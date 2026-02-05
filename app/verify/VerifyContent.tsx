"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyWaitlistEmail } from "@/lib/waitlist";

export function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      const result = await verifyWaitlistEmail(token);

      if (result.success) {
        setStatus("success");
        setMessage("Email verified successfully! Welcome to the waitlist.");
      } else {
        setStatus("error");
        setMessage(result.error || "Verification failed");
      }
    }

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-white/5 px-8 py-12 text-center backdrop-blur-xl">
        {status === "loading" && (
          <>
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            <p className="text-zinc-400">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mb-4 text-4xl">✅</div>
            <h1 className="mb-2 text-2xl font-semibold text-white">
              Verification Successful
            </h1>
            <p className="text-cyan-300">{message}</p>
            <p className="mt-4 text-sm text-zinc-400">
              You&apos;ll receive updates about Volume 3.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mb-4 text-4xl">❌</div>
            <h1 className="mb-2 text-2xl font-semibold text-white">
              Verification Failed
            </h1>
            <p className="text-zinc-400">{message}</p>
            <p className="mt-4 text-sm text-zinc-400">
              The link may be invalid or expired.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
