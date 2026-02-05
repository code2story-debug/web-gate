"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setShowBanner(true), 500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setShowBanner(false);
  };

  if (!mounted || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-4xl rounded-lg border border-zinc-800 bg-zinc-900/95 backdrop-blur-sm shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-white md:text-xl">
              Cookie Consent
            </h2>
            <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
              We use cookies to enhance your experience and analyze site usage. 
              By clicking &quot;Accept All&quot; you consent to all cookies. 
              You can also choose &quot;Reject All&quot; to decline non-essential cookies.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/privacy-policy"
              className="text-sm text-zinc-400 underline transition-colors hover:text-zinc-300"
            >
              Privacy Policy
            </Link>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleReject}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-3 text-sm font-medium text-white transition-all hover:border-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
              >
                Reject All
              </button>

              <button
                onClick={handleAccept}
                className="rounded-lg border border-cyan-500 bg-cyan-500/20 px-6 py-3 text-sm font-medium text-cyan-300 transition-all hover:bg-cyan-500/30 hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
