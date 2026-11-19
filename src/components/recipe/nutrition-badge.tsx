import { NutritionSummary } from "@/lib/nutrition/calculator";
import { Flame, ShieldAlert, Award } from "lucide-react";

interface NutritionBadgeProps {
  nutrition: NutritionSummary;
  servings: number;
}

export function NutritionBadge({ nutrition, servings }: NutritionBadgeProps) {
  const { perServing, allergens } = nutrition;

  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Informasi Nilai Gizi</h3>
            <p className="text-xs text-neutral-500">Estimasi per sajian ({servings} porsi total)</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
          <Award className="w-3 h-3" /> Auto-calculated
        </span>
      </div>

      {/* Grid Makronutrisi */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-orange-50/70 border border-orange-100 rounded-xl p-2.5 text-center">
          <span className="block text-[11px] font-semibold text-orange-800">Kalori</span>
          <span className="text-lg font-black text-orange-600">{perServing.calories}</span>
          <span className="block text-[10px] text-orange-700/80">kkal</span>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-center">
          <span className="block text-[11px] font-semibold text-neutral-600">Protein</span>
          <span className="text-lg font-black text-neutral-800">{perServing.proteinGrams}</span>
          <span className="block text-[10px] text-neutral-500">gram</span>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-center">
          <span className="block text-[11px] font-semibold text-neutral-600">Lemak</span>
          <span className="text-lg font-black text-neutral-800">{perServing.fatGrams}</span>
          <span className="block text-[10px] text-neutral-500">gram</span>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-center">
          <span className="block text-[11px] font-semibold text-neutral-600">Karbo</span>
          <span className="text-lg font-black text-neutral-800">{perServing.carbsGrams}</span>
          <span className="block text-[10px] text-neutral-500">gram</span>
        </div>
      </div>

      {/* Alergen Warnings jika ada */}
      {allergens.length > 0 && (
        <div className="pt-2 border-t border-neutral-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Mengandung Potensi Alergen:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allergens.map((alg) => (
              <span
                key={alg}
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200"
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
