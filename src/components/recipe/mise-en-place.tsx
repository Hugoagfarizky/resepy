"use client";

import { useState } from "react";
import Link from "next/link";
import { RecipeFull } from "@/types/recipe";
import { Check, ClipboardCheck, Sparkles, Flame, Play, CheckCircle2 } from "lucide-react";

interface MiseEnPlaceProps {
  recipe: RecipeFull;
  servings: number;
}

export function MiseEnPlaceChecklist({ recipe, servings }: MiseEnPlaceProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Dynamic preparation checkpoints
  const initialItems = [
    { id: "m1", label: "Semua bumbu halus & rempah sudah diulek / dihaluskan dalam mangkuk", isDone: false },
    { id: "m2", label: `Bahan utama (${recipe.components[0]?.title || "Daging/Sayur"}) sudah dipotong & dibersihkan`, isDone: false },
    { id: "m3", label: "Cairan santan, air, minyak, atau saus sudah ditakar siap tuang", isDone: false },
    { id: "m4", label: "Wajan / panci, spatula, dan lap dapur bersih sudah di samping kompor", isDone: false },
    { id: "m5", label: "Piring saji atau wadah peniris minyak sudah disiapkan", isDone: false },
  ];

  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, isDone: !i.isDone } : i)));
  };

  const doneCount = items.filter((i) => i.isDone).length;
  const isAllReady = doneCount === items.length;
  const progressPercent = Math.round((doneCount / items.length) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center font-bold">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-neutral-900">
                &ldquo;Mise en Place&rdquo; Pre-Flight Checklist
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                Anti-Gosong
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-medium">
              Siapkan semua bahan di mangkuk kecil SEBELUM kompor dinyalakan agar memasak tenang.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-black text-orange-600 hover:text-orange-700 underline"
        >
          {isOpen ? "Sembunyikan" : "Buka Checklist"}
        </button>
      </div>

      {/* Progress mini bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-neutral-700">
          <span>Kesiapan Dapur: {doneCount} dari {items.length} siap</span>
          <span className="font-mono text-orange-700 font-black">{progressPercent}%</span>
        </div>
        <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
          <div
            className={`h-2 transition-all duration-300 ${
              isAllReady ? "bg-emerald-500" : "bg-orange-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist items */}
      {isOpen && (
        <div className="pt-3 border-t border-neutral-200 space-y-2.5 animate-fade-in">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-colors ${
                item.isDone
                  ? "bg-emerald-50/70 border-emerald-300 text-neutral-800"
                  : "bg-neutral-50/70 border-neutral-200 text-neutral-800 hover:bg-neutral-100/70"
              }`}
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                  item.isDone
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-neutral-400 bg-white"
                }`}
              >
                {item.isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span
                className={`text-xs select-none ${
                  item.isDone ? "line-through text-neutral-500 font-medium" : "font-semibold"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}

          {/* When 100% Ready */}
          {isAllReady && (
            <div className="p-4 rounded-2xl bg-emerald-100/90 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span className="font-black text-emerald-950">
                  Semua Siap! Kompor aman dinyalakan tanpa panik.
                </span>
              </div>

              <Link
                href={`/recipes/${recipe.slug}/cook?servings=${servings}`}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Nyalakan Kompor & Mulai Masak</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
