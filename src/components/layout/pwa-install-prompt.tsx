"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 bg-neutral-900 text-white p-3.5 rounded-2xl shadow-2xl border border-neutral-700 flex items-center gap-3 animate-fade-in max-w-sm no-print">
      <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center shrink-0">
        <Download className="w-5 h-5 text-white" />
      </div>

      <div className="flex-1 text-xs">
        <p className="font-extrabold text-neutral-100">Pasang Aplikasi Luminaire</p>
        <p className="text-neutral-400">Akses cepat di dapur tanpa bar browser.</p>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={handleInstallClick}
          className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white transition-colors"
        >
          Pasang
        </button>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="p-1 text-neutral-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
