"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UtensilsCrossed,
  Compass,
  Refrigerator,
  CalendarDays,
  ShoppingCart,
  PlusCircle,
  Flame,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/explore", label: "Eksplorasi", icon: Compass },
    { href: "/pantry", label: "Isi Kulkas", icon: Refrigerator, badge: "Pintar" },
    { href: "/planner", label: "Meal Plan", icon: CalendarDays },
    { href: "/grocery", label: "Belanjaan", icon: ShoppingCart },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-neutral-900 group-hover:text-orange-600 transition-colors">
                Luminaire<span className="text-orange-600">Kitchen</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-black tracking-widest text-orange-800 bg-orange-100 px-2 py-0.5 rounded ml-2 border border-orange-300">
                Culinary Engine
              </span>
            </div>
          </Link>

          {/* Nav Links Desktop */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-extrabold transition-all ${
                    isActive
                      ? "bg-orange-600 text-white shadow-sm shadow-orange-600/30"
                      : "text-neutral-700 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-600"}`} />
                  <span>{link.label}</span>
                  {link.badge && !isActive && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Button: Create Recipe */}
          <div className="flex items-center gap-2">
            <Link
              href="/studio/recipes/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black bg-neutral-900 text-white hover:bg-orange-600 transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-orange-400 stroke-[2.5]" />
              <span className="hidden sm:inline">Tulis Resep</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 px-2 py-1.5 shadow-lg flex justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-bold ${
            pathname === "/" ? "text-orange-600 font-black" : "text-neutral-700"
          }`}
        >
          <Flame className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center py-1 px-3 rounded-lg text-[11px] font-bold ${
                isActive ? "text-orange-600 font-black" : "text-neutral-700"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
