import Link from "next/link";
import { MOCK_RECIPES } from "@/data/mock-recipes";
import { RecipeCard } from "@/components/recipe/recipe-card";
import {
  UtensilsCrossed,
  Refrigerator,
  CalendarDays,
  ShoppingCart,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  ShieldCheck,
  ChefHat,
  Play,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const featuredRecipes = MOCK_RECIPES.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900 text-white py-20 lg:py-28">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-950/80 border border-orange-700/60 text-orange-400 text-xs font-bold uppercase tracking-wider shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Culinary Experience & Smart Pantry</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Masak Lebih Cerdas dengan{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-500 to-rose-500">
              Resep Interaktif & Pintar
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Platform kuliner lengkap dengan porsi dinamis (*dynamic scaler*), satuan lokal & metrik,
            panduan memasak layar penuh dengan audio timer per langkah, serta pencari resep otomatis
            dari isi kulkas Anda.
          </p>

          {/* Quick Actions CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-orange-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Jelajahi Resep Pilihan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/pantry"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm sm:text-base border border-neutral-700 hover:scale-105 active:scale-95 transition-all"
            >
              <Refrigerator className="w-5 h-5 text-orange-400" />
              <span>Cek Bahan di Kulkas</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-xs hover:border-orange-200 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Resep Multi-Komponen
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Bahan terstruktur rapi per kelompok: Marinasi, Bumbu Halus, Kuah, dan Garnish tanpa
              bercampur aduk.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-xs hover:border-orange-200 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
              <Play className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Cooking Mode Layar Penuh
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Layar tidak akan mati (Screen WakeLock), font ekstra besar, timer suara, dan panduan
              langkah per langkah ramah tangan dapur.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-xs hover:border-orange-200 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Refrigerator className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Pantry & Cegah Food Waste
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Ketahui resep apa yang bisa dimasak dari bahan yang ada dan prioritaskan bahan yang
              hampir kedaluwarsa.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-xs hover:border-orange-200 hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-neutral-900">
              Smart Grocery & Meal Plan
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Daftar belanja pintar otomatis menggabungkan jumlah bahan dari berbagai menu dan
              mengelompokkannya per lorong pasar.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4" />
              <span>Paling Populer Minggu Ini</span>
            </div>
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight">
              Hidangan Istimewa Terpilih
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Resep teruji dari para kreator kuliner dengan rating tinggi dan instruksi lengkap.
            </p>
          </div>

          <Link
            href="/explore"
            className="text-xs font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1.5 transition-colors"
          >
            <span>Lihat Semua Katalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Smart Fridge Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-tr from-orange-600 to-amber-500 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-orange-200 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Fitur Unggulan
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
              Bingung Mau Masak Apa Hari Ini? Coba Fitur Kulkas Pintar.
            </h3>
            <p className="text-sm sm:text-base text-orange-100 leading-relaxed">
              Cukup centang bahan apa saja yang ada di kulkas Anda (misal: Telur, Bawang Merah,
              Ayam), sistem akan langsung mencocokkan resep dengan tingkat kesiapan tertinggi!
            </p>
            <div className="pt-2">
              <Link
                href="/pantry"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-extrabold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <Refrigerator className="w-4 h-4 text-orange-400" />
                <span>Buka Pantry Saya Sekarang</span>
              </Link>
            </div>
          </div>

          {/* Graphical badge / card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl space-y-3 w-full sm:w-80 shadow-inner">
            <div className="flex items-center justify-between text-xs font-bold text-white">
              <span>Status Kulkas</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/80 text-white">Aktif</span>
            </div>
            <div className="space-y-2 text-xs text-white/90">
              <div className="flex justify-between pb-1 border-b border-white/10">
                <span>Bawang Merah & Putih</span>
                <span className="font-bold">✓ Tersedia</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-white/10">
                <span>Telur Ayam (Exp: 2 hari)</span>
                <span className="font-bold text-amber-200">⚠ Prioritas</span>
              </div>
              <div className="flex justify-between">
                <span>Kecocokan Resep</span>
                <span className="font-black text-white">85% Siap Masak</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
