import { DollarSign, Wallet, TrendingDown, CheckCircle } from "lucide-react";

interface CostEstimatorProps {
  recipeSlug: string;
  currentServings: number;
}

// Perkiraan biaya bahan mentah per porsi (benchmark pasar tradisional/supermarket lokal)
const BASE_COST_PER_SERVING: Record<string, number> = {
  "rendang-daging-sapi-otentik": 22000, // Daging sapi sandung lamur + santan murni
  "japanese-chicken-katsu-curry": 14000, // Fillet ayam + blok kari Jepang + kentang wortel
  "ayam-bakar-taliwang-khas-lombok": 15000, // Ayam kampung + cabai & terasi
  "gado-gado-siram-saus-kacang-mede": 9000, // Aneka sayuran + kacang mede & tahu tempe
};

const RESTAURANT_COST_PER_SERVING: Record<string, number> = {
  "rendang-daging-sapi-otentik": 45000,
  "japanese-chicken-katsu-curry": 42000,
  "ayam-bakar-taliwang-khas-lombok": 38000,
  "gado-gado-siram-saus-kacang-mede": 25000,
};

export function CostEstimator({ recipeSlug, currentServings }: CostEstimatorProps) {
  const baseCost = BASE_COST_PER_SERVING[recipeSlug] || 12000;
  const restoCost = RESTAURANT_COST_PER_SERVING[recipeSlug] || 32000;

  const totalHomemadeCost = baseCost * currentServings;
  const totalRestaurantCost = restoCost * currentServings;
  const totalSaved = Math.max(0, totalRestaurantCost - totalHomemadeCost);
  const percentSaved = Math.round((totalSaved / totalRestaurantCost) * 100);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-neutral-900">
              Estimator Biaya Masak Sendiri
            </h3>
            <p className="text-xs text-neutral-600 font-medium">
              Perkiraan belanja bahan mentah untuk {currentServings} porsi.
            </p>
          </div>
        </div>

        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1 shadow-2xs">
          <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
          <span>Hemat ~{percentSaved}%</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 space-y-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-950">
            Total Biaya Belanja Masak
          </span>
          <p className="text-2xl font-black text-emerald-700 tracking-tight">
            {formatRupiah(totalHomemadeCost)}
          </p>
          <p className="text-xs text-emerald-900 font-bold">
            ≈ {formatRupiah(baseCost)} / porsi
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-100/70 border border-neutral-200 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
            Jika Beli Matang / Delivery
          </span>
          <p className="text-2xl font-black text-neutral-700 line-through tracking-tight">
            {formatRupiah(totalRestaurantCost)}
          </p>
          <p className="text-xs text-emerald-700 font-black">
            Bisa hemat {formatRupiah(totalSaved)} untuk {currentServings} orang!
          </p>
        </div>
      </div>
    </div>
  );
}
