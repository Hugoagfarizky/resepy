import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luminaire Kitchen - Platform Resep Makanan Interaktif & Smart Pantry",
  description:
    "Ekosistem resep masakan modern: porsi dinamis, satuan lokal & metrik, hands-free cooking mode dengan timer, dan kulkas pintar anti food-waste.",
  applicationName: "Luminaire Kitchen",
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
      <body className="min-h-full flex flex-col bg-neutral-50/50 text-neutral-900 selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
        <Suspense fallback={<div className="h-16 border-b border-orange-100 bg-white" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>

        <footer className="border-t border-neutral-200 bg-white py-10 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black text-xs">
                LK
              </div>
              <span className="font-extrabold text-base text-neutral-900">
                Luminaire<span className="text-orange-600">Kitchen</span>
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-md mx-auto">
              Platform kuliner modern dengan sistem satuan hibrida, mode masak interaktif bersuara,
              smart pantry, dan perencanaan makan cerdas.
            </p>
            <p className="text-[11px] text-neutral-400">
              © 2026 Luminaire Kitchen. Dibuat dengan cinta untuk para pecinta kuliner.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
