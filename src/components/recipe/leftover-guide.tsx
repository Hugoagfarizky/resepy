import { Snowflake, Refrigerator, Flame, ShieldAlert, Sparkles } from "lucide-react";

interface LeftoverGuideProps {
  recipeTitle: string;
  chillerDays?: number;
  freezerMonths?: number;
  bestReheatMethod?: string;
  reheatTip?: string;
}

export function LeftoverGuide({
  recipeTitle,
  chillerDays = 4,
  freezerMonths = 2,
  bestReheatMethod = "Wajan Api Kecil / Air Fryer",
  reheatTip = "Panaskan dengan sedikit percikan air atau gunakan air fryer 160°C selama 3-5 menit agar tekstur dan kelembapan aslinya tetap terjaga sempurna.",
}: LeftoverGuideProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
          <Snowflake className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-neutral-900">
            Panduan Simpan & Hangatkan (Leftover Guide)
          </h3>
          <p className="text-xs text-neutral-600 font-medium">
            Tips penyimpanan dan pemanasan ulang agar cita rasa tetap maksimal.
          </p>
        </div>
      </div>

      {/* Grid Daya Tahan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
          <Refrigerator className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-black uppercase text-blue-950">Kulkas Bawah (Chiller)</span>
            <p className="text-sm font-black text-blue-900">Tahan {chillerDays} Hari</p>
            <p className="text-xs text-blue-800/90 leading-tight">
              Simpan dalam wadah kedap udara (*airtight container*) setelah dingin.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3">
          <Snowflake className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-black uppercase text-indigo-950">Freezer Beku</span>
            <p className="text-sm font-black text-indigo-900">Tahan Hingga {freezerMonths} Bulan</p>
            <p className="text-xs text-indigo-800/90 leading-tight">
              Bagi ke porsi makan sekali habis sebelum dibekukan.
            </p>
          </div>
        </div>
      </div>

      {/* Reheat Tip */}
      <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
          <Flame className="w-4 h-4 text-orange-600 stroke-[2.5]" />
          <span>Metode Pemanasan Ulang Terbaik: <strong>{bestReheatMethod}</strong></span>
        </div>
        <p className="text-xs text-neutral-800 leading-relaxed font-medium">
          {reheatTip}
        </p>
      </div>
    </div>
  );
}
