import { RecipeFull } from "@/types/recipe";
import { formatQuantity, getUnitDisplayLabel } from "@/lib/units/format";

interface KitchenPrintSheetProps {
  recipe: RecipeFull;
  servings: number;
}

export function KitchenPrintSheet({ recipe, servings }: KitchenPrintSheetProps) {
  const scaleRatio = servings / recipe.defaultServings;
  const totalMinutes = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{recipe.title}</h1>
          <p className="text-sm text-neutral-800 mt-1 max-w-xl">
            {recipe.description}
          </p>
        </div>
        <div className="text-right text-xs font-mono shrink-0">
          <p className="font-bold text-sm">RESEPY</p>
          <p>Lembar Masak Dapur</p>
          <p className="font-bold mt-1">Porsi: {servings} Orang</p>
        </div>
      </div>

      {/* Meta Specs Bar */}
      <div className="grid grid-cols-4 gap-2 border border-neutral-400 p-2 text-xs font-mono text-center mb-6">
        <div>
          <span className="block text-neutral-600">Total Waktu</span>
          <span className="font-bold">{totalMinutes} Menit</span>
        </div>
        <div>
          <span className="block text-neutral-600">Prep / Masak</span>
          <span className="font-bold">{recipe.prepTimeMinutes}m / {recipe.cookTimeMinutes}m</span>
        </div>
        <div>
          <span className="block text-neutral-600">Kesulitan</span>
          <span className="font-bold">{recipe.difficulty}</span>
        </div>
        <div>
          <span className="block text-neutral-600">Asal Daerah</span>
          <span className="font-bold">{recipe.originRegion || "Nusantara"}</span>
        </div>
      </div>

      {/* Two-Column Body: Left Ingredients (40%), Right Instructions (60%) */}
      <div className="grid grid-cols-12 gap-8">
        {/* Ingredients Column */}
        <div className="col-span-5 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider border-b border-black pb-1">
            Daftar Bahan ({servings} Porsi)
          </h2>

          <div className="space-y-4">
            {recipe.components.map((comp) => (
              <div key={comp.id} className="space-y-1.5 break-inside-avoid">
                <h3 className="text-xs font-bold uppercase underline text-neutral-800">
                  {comp.title}:
                </h3>
                <ul className="text-xs space-y-1">
                  {comp.ingredients.map((ing) => {
                    const scaled = ing.quantity * scaleRatio;
                    return (
                      <li key={ing.id} className="flex items-start gap-2">
                        <span className="w-3.5 h-3.5 border border-black rounded-xs inline-block shrink-0 mt-0.5" />
                        <span>
                          <strong>{ing.name}</strong> – {formatQuantity(scaled)}{" "}
                          {getUnitDisplayLabel(ing.unit)}
                          {ing.preparation ? ` (${ing.preparation})` : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Column */}
        <div className="col-span-7 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider border-b border-black pb-1">
            Instruksi Langkah Memasak
          </h2>

          <ol className="text-xs space-y-3">
            {recipe.steps.map((step) => (
              <li key={step.id} className="break-inside-avoid space-y-1 border-b border-neutral-200 pb-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-sm">{step.stepNumber}.</span>
                  <span className="leading-relaxed font-normal">{step.instruction}</span>
                </div>

                {step.timerSeconds && (
                  <p className="text-[11px] font-mono font-bold text-neutral-700 pl-5">
                    ⏱ Timer: {Math.floor(step.timerSeconds / 60)} menit ({step.timerLabel || "Tahap ini"})
                  </p>
                )}

                {step.chefTip && (
                  <p className="text-[11px] italic text-neutral-700 pl-5">
                    💡 Tips Koki: {step.chefTip}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Footer Print */}
      <div className="mt-8 pt-4 border-t border-neutral-300 text-[10px] text-neutral-500 flex justify-between items-center">
        <span>Dicetak dari Resepy • Resep oleh {recipe.authorName}</span>
        <span>Tempel di kulkas untuk panduan praktis anti layar kotor!</span>
      </div>
    </div>
  );
}
