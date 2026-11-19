"use client";

import { useState } from "react";
import { RecipeComponentGroup } from "@/types/recipe";
import { scaleQuantity, convertToEstimatedGrams } from "@/lib/units/converter";
import { formatQuantity, getUnitDisplayLabel } from "@/lib/units/format";
import { findSubstitutions, SubstitutionOption } from "@/lib/substitutions/database";
import {
  Check,
  CheckCheck,
  SlidersHorizontal,
  Lightbulb,
  X,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

interface IngredientListProps {
  components: RecipeComponentGroup[];
  baseServings: number;
  currentServings: number;
}

export function IngredientList({
  components,
  baseServings,
  currentServings,
}: IngredientListProps) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [useMetricOnly, setUseMetricOnly] = useState<boolean>(false);
  
  // Substitution Modal State
  const [activeSubstitute, setActiveSubstitute] = useState<{
    ingredientName: string;
    substitutes: SubstitutionOption[];
  } | null>(null);

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedIds(next);
  };

  const checkAll = () => {
    const allIds = components.flatMap((c) => c.ingredients.map((i) => i.id));
    setCheckedIds(new Set(allIds));
  };

  const uncheckAll = () => {
    setCheckedIds(new Set());
  };

  const handleOpenSubstitute = (e: React.MouseEvent, ingName: string) => {
    e.stopPropagation();
    const subs = findSubstitutions(ingName);
    if (subs) {
      setActiveSubstitute({
        ingredientName: ingName,
        substitutes: subs,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-black text-neutral-900 tracking-tight">
            Daftar Bahan Makanan
          </h3>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-neutral-200/80 text-neutral-800">
            {components.reduce((acc, c) => acc + c.ingredients.length, 0)} bahan
          </span>
        </div>

        {/* Action Toggles: Metric conversion & Quick Check */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setUseMetricOnly(!useMetricOnly)}
            className={`text-xs font-black px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all shadow-2xs ${
              useMetricOnly
                ? "bg-orange-600 border-orange-600 text-white"
                : "bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{useMetricOnly ? "Mode: Gram (Metrik)" : "Satuan Asli Resep"}</span>
          </button>

          {checkedIds.size === 0 ? (
            <button
              type="button"
              onClick={checkAll}
              className="text-xs font-bold text-neutral-600 hover:text-neutral-950 transition-colors hidden sm:inline"
            >
              Centang Semua
            </button>
          ) : (
            <button
              type="button"
              onClick={uncheckAll}
              className="text-xs font-black text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Reset ({checkedIds.size})</span>
            </button>
          )}
        </div>
      </div>

      {/* Component Sections */}
      <div className="space-y-6">
        {components.map((comp) => (
          <div key={comp.id} className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-950 bg-orange-100 px-3.5 py-1.5 rounded-lg border border-orange-300 inline-block shadow-2xs">
              {comp.title}
            </h4>

            <ul className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200/90 bg-white shadow-xs overflow-hidden">
              {comp.ingredients.map((ing) => {
                const isChecked = checkedIds.has(ing.id);
                const scaledQty = scaleQuantity(ing.quantity, baseServings, currentServings);

                let displayQty = formatQuantity(scaledQty);
                let displayUnit = getUnitDisplayLabel(ing.unit);

                if (useMetricOnly && ing.unit !== "SECUKUPNYA") {
                  const estimatedGrams = Math.round(
                    scaleQuantity(
                      convertToEstimatedGrams(ing.quantity, ing.unit),
                      baseServings,
                      currentServings
                    )
                  );
                  if (estimatedGrams > 0) {
                    displayQty = estimatedGrams.toString();
                    displayUnit = "g (est.)";
                  }
                }

                const availableSubstitutes = findSubstitutions(ing.name);

                return (
                  <li
                    key={ing.id}
                    onClick={() => toggleCheck(ing.id)}
                    className={`flex items-start gap-3.5 p-4 cursor-pointer transition-colors hover:bg-neutral-50 ${
                      isChecked ? "bg-neutral-50/80" : ""
                    }`}
                  >
                    {/* Checkbox Icon */}
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                        isChecked
                          ? "bg-orange-600 border-orange-600 text-white"
                          : "border-neutral-400 bg-white"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    {/* Ingredient Detail */}
                    <div className="flex-1 text-sm select-none">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`font-extrabold ${
                              isChecked ? "text-neutral-400 line-through" : "text-neutral-900"
                            }`}
                          >
                            {ing.name}
                          </span>

                          {/* Substitution Suggestion Tag if available */}
                          {availableSubstitutes && !isChecked && (
                            <button
                              type="button"
                              onClick={(e) => handleOpenSubstitute(e, ing.name)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors shadow-2xs"
                              title="Bahan ini bisa diganti jika stok di rumah habis!"
                            >
                              <Lightbulb className="w-3 h-3 text-amber-700 stroke-[2.5]" />
                              <span>Saran Pengganti</span>
                            </button>
                          )}
                        </div>

                        <span
                          className={`font-mono text-sm shrink-0 ${
                            isChecked ? "text-neutral-400" : "text-orange-700 font-black"
                          }`}
                        >
                          {displayQty} {displayUnit}
                        </span>
                      </div>

                      {ing.preparation && (
                        <p
                          className={`text-xs italic mt-0.5 ${
                            isChecked ? "text-neutral-400" : "text-neutral-600 font-medium"
                          }`}
                        >
                          ({ing.preparation})
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Ingredient Substitution Dialog / Modal */}
      {activeSubstitute && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-neutral-200 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center font-bold">
                  <Lightbulb className="w-4 h-4 text-amber-700 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-neutral-900">
                    Bahan Pengganti Instan
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium">
                    Alternatif untuk: <strong className="text-orange-700">{activeSubstitute.ingredientName}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveSubstitute(null)}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {activeSubstitute.substitutes.map((sub, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-sm text-neutral-900 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
                      {sub.name}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded-md">
                      Rasio: {sub.ratio}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                    {sub.tasteNote}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setActiveSubstitute(null)}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-xs"
              >
                Mengerti, Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
