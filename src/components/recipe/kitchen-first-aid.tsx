"use client";

import { useState } from "react";
import { KITCHEN_EMERGENCIES, KitchenEmergency } from "@/data/kitchen-first-aid";
import {
  LifeBuoy,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle,
  FlaskConical,
} from "lucide-react";

export function KitchenFirstAid() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeEmergency, setActiveEmergency] = useState<KitchenEmergency | null>(null);

  const categories = ["ALL", "Rasa", "Kuah & Saus", "Tekstur", "Gorengan"];

  const filtered = KITCHEN_EMERGENCIES.filter((item) => {
    if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.problem.toLowerCase().includes(q) ||
        item.quickFix.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-300 text-rose-700 flex items-center justify-center font-bold">
            <LifeBuoy className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-neutral-900">
                Penyelamat Masakan Darurat (Kitchen First-Aid)
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                Solusi Instan
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-medium">
              Masakan keasinan, santan pecah, atau terlalu pedas? Temukan penyelamatnya di sini.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
          title={isOpen ? "Tutup panel penyelamat" : "Buka panel penyelamat"}
        >
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="pt-3 border-t border-neutral-200 space-y-4 animate-fade-in">
          {/* Quick Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-rose-600 text-white shadow-2xs"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {cat === "ALL" ? "Semua Masalah" : cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari masalah (misal: asin, pedas, santan, alot)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-semibold text-neutral-900 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-rose-500 bg-white placeholder:text-neutral-500"
            />
          </div>

          {/* List of Emergencies */}
          <div className="space-y-3">
            {filtered.map((item) => {
              const isSelected = activeEmergency?.id === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all ${
                    isSelected
                      ? "bg-rose-50/70 border-rose-300 shadow-xs"
                      : "bg-neutral-50/80 border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveEmergency(isSelected ? null : item)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertCircle
                        className={`w-4 h-4 shrink-0 ${
                          item.urgency === "Tinggi" ? "text-rose-600" : "text-amber-600"
                        }`}
                      />
                      <span className="text-sm font-extrabold text-neutral-900">
                        {item.problem}
                      </span>
                    </div>

                    <span className="text-xs font-bold text-rose-700 underline shrink-0">
                      {isSelected ? "Tutup Solusi" : "Lihat Solusi"}
                    </span>
                  </button>

                  {/* Expanded Detail Solution */}
                  {isSelected && (
                    <div className="px-4 pb-4 pt-1 space-y-3 border-t border-rose-200/80 text-xs">
                      {/* Step 1: Quick Fix */}
                      <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-2xs space-y-1">
                        <span className="font-black text-rose-950 flex items-center gap-1.5 uppercase tracking-wide">
                          <CheckCircle className="w-4 h-4 text-rose-600" />
                          Langkah Penyelamatan Cepat (3 Detik):
                        </span>
                        <p className="text-neutral-800 leading-relaxed font-semibold">
                          {item.quickFix}
                        </p>
                      </div>

                      {/* Step 2: Scientific Explanation */}
                      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-neutral-800 space-y-1">
                        <span className="font-black text-amber-950 flex items-center gap-1.5 uppercase tracking-wide">
                          <FlaskConical className="w-3.5 h-3.5 text-amber-700" />
                          Penjelasan Kuliner / Kimia Rasa:
                        </span>
                        <p className="text-neutral-700 leading-relaxed font-normal">
                          {item.scientificReason}
                        </p>
                      </div>

                      {/* Step 3: Pro Tip */}
                      <p className="text-neutral-600 italic font-medium px-1">
                        <strong className="text-neutral-800 font-bold not-italic">Tips Pencegahan:</strong>{" "}
                        {item.proTip}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
