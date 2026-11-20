import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { PWAInstallPrompt } from "@/components/layout/pwa-install-prompt";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Ikut basePath supaya manifest dan ikon tetap ketemu di GitHub Pages (/resepy/).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Luminaire Kitchen - Platform Resep Makanan Interaktif & Smart Pantry",
  description:
    "Ekosistem resep masakan modern: porsi dinamis, satuan lokal & metrik, hands-free cooking mode dengan timer, dan kulkas pintar anti food-waste.",
  applicationName: "Luminaire Kitchen",
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: `${basePath}/icons/icon.svg`,
    apple: `${basePath}/icons/icon.svg`,
  },
  keywords: [
    "resep makanan",
    "resep masakan indonesia",
    "cooking mode",
    "smart pantry",
    "meal planner",
    "kalkulator porsi",
    "nutrition calculator",
  ],
};

export const viewport: Viewport = {
  themeColor: "#ea580c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-neutral-900 selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
        <Suspense fallback={<div className="h-16 border-b border-neutral-200 bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>

        <PWAInstallPrompt />

        <footer className="border-t border-neutral-200 bg-white py-12 mt-20 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                LK
              </div>
              <span className="font-black text-lg text-neutral-900">
                Luminaire<span className="text-orange-600">Kitchen</span>
              </span>
            </div>
            <p className="text-xs text-neutral-600 max-w-md mx-auto font-medium leading-relaxed">
              Platform kuliner modern dengan sistem satuan hibrida, mode masak interaktif bersuara,
              smart pantry, dan perencanaan makan cerdas.
            </p>
            <p className="text-xs text-neutral-500 font-semibold">
              © 2026 Luminaire Kitchen. Dibuat dengan cinta untuk para pecinta kuliner.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
