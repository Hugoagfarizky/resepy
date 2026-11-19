import { NutritionSummary } from "@/lib/nutrition/calculator";
import { Flame, ShieldAlert, Award } from "lucide-react";

interface NutritionBadgeProps {
  nutrition: NutritionSummary;
  servings: number;
}

export function NutritionBadge({ nutrition, servings }: NutritionBadgeProps) {
  const { perServing, allergens } = nutrition;

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-neutral-900">Informasi Nilai Gizi</h3>
            <p className="text-xs text-neutral-600 font-medium">Estimasi per sajian ({servings} porsi total)</p>
          </div>
        </div>
        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1 shadow-2xs">
          <Award className="w-3.5 h-3.5 text-emerald-700" /> Auto-calculated
        </span>
      </div>

      {/* Grid Makronutrisi with High Contrast */}
      <div className="grid grid-cols-4 gap-2.5">
        <div className="bg-orange-100/70 border border-orange-200 rounded-2xl p-3 text-center">
          <span className="block text-[11px] font-black text-orange-950">Kalori</span>
          <span className="text-lg sm:text-xl font-black text-orange-700">{perServing.calories}</span>
          <span className="block text-[10px] text-orange-900 font-bold">kkal</span>
        </div>

        <div className="bg-neutral-100/80 border border-neutral-200 rounded-2xl p-3 text-center">
          <span className="block text-[11px] font-bold text-neutral-800">Protein</span>
          <span className="text-lg sm:text-xl font-black text-neutral-950">{perServing.proteinGrams}</span>
          <span className="block text-[10px] text-neutral-600 font-semibold">gram</span>
        </div>

        <div className="bg-neutral-100/80 border border-neutral-200 rounded-2xl p-3 text-center">
          <span className="block text-[11px] font-bold text-neutral-800">Lemak</span>
          <span className="text-lg sm:text-xl font-black text-neutral-950">{perServing.fatGrams}</span>
          <span className="block text-[10px] text-neutral-600 font-semibold">gram</span>
        </div>

        <div className="bg-neutral-100/80 border border-neutral-200 rounded-2xl p-3 text-center">
          <span className="block text-[11px] font-bold text-neutral-800">Karbo</span>
          <span className="text-lg sm:text-xl font-black text-neutral-950">{perServing.carbsGrams}</span>
          <span className="block text-[10px] text-neutral-600 font-semibold">gram</span>
        </div>
      </div>

      {/* Alergen Warnings jika ada */}
      {allergens.length > 0 && (
        <div className="pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-950 mb-2">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            <span>Mengandung Potensi Alergen:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allergens.map((alg) => (
              <span
                key={alg}
                className="text-[11px] font-black px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 shadow-2xs"
              >
                {alg.replace("_", " ")}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
