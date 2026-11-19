"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MealPlanDayEntry, RecipeFull } from "@/types/recipe";
import { INITIAL_MEAL_PLANS, MOCK_RECIPES } from "@/data/mock-recipes";
import { aggregateGroceryList } from "@/lib/grocery/aggregator";
import {
  CalendarDays,
  Plus,
  Trash2,
  ShoppingCart,
  Check,
  Utensils,
  Clock,
  Sparkles,
} from "lucide-react";

export function PlannerClient() {
  const [mealPlans, setMealPlans] = useState<MealPlanDayEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [exportedSuccess, setExportedSuccess] = useState<boolean>(false);

  // Modal / Quick add state
  const [selectedRecipeSlug, setSelectedRecipeSlug] = useState<string>(MOCK_RECIPES[0].slug);
  const [selectedMealType, setSelectedMealType] = useState<"BREAKFAST" | "LUNCH" | "DINNER">("DINNER");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedServings, setSelectedServings] = useState<number>(4);

  useEffect(() => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
    try {
      const stored = localStorage.getItem("luminaire_meal_plans");
      if (stored) {
        setMealPlans(JSON.parse(stored));
      } else {
        setMealPlans(INITIAL_MEAL_PLANS);
      }
    } catch {
      setMealPlans(INITIAL_MEAL_PLANS);
    }
    setIsLoaded(true);
  }, []);

  const saveMealPlans = (plans: MealPlanDayEntry[]) => {
    setMealPlans(plans);
    try {
      localStorage.setItem("luminaire_meal_plans", JSON.stringify(plans));
    } catch {
      // ignore
    }
  };

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const recipe = MOCK_RECIPES.find((r) => r.slug === selectedRecipeSlug);
    if (!recipe) return;

    const newEntry: MealPlanDayEntry = {
      id: `mp_${Date.now()}`,
      recipeId: recipe.id,
      recipeTitle: recipe.title,
      recipeSlug: recipe.slug,
      recipeCover: recipe.coverImage,
      date: selectedDate,
      mealType: selectedMealType,
      servings: selectedServings,
    };

    saveMealPlans([...mealPlans, newEntry]);
  };

  const handleDeletePlan = (id: string) => {
    saveMealPlans(mealPlans.filter((p) => p.id !== id));
  };

  const handleExportToGrocery = () => {
    // Map meal plans to recipes with targetServings
    const recipeMap = new Map<string, RecipeFull>();
    MOCK_RECIPES.forEach((r) => recipeMap.set(r.id, r));

    const recipesWithServings = mealPlans
      .map((mp) => {
        const recipe = recipeMap.get(mp.recipeId);
        return recipe ? { recipe, targetServings: mp.servings } : null;
      })
      .filter(Boolean) as { recipe: RecipeFull; targetServings: number }[];

    const aggregated = aggregateGroceryList(recipesWithServings);

    try {
      const existingStr = localStorage.getItem("luminaire_grocery_items");
      const existingItems = existingStr ? JSON.parse(existingStr) : [];
      localStorage.setItem(
        "luminaire_grocery_items",
        JSON.stringify([...existingItems, ...aggregated])
      );
      setExportedSuccess(true);
      setTimeout(() => setExportedSuccess(false), 3500);
    } catch {
      setExportedSuccess(true);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header & Export CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4 text-orange-600" />
            <span>Weekly Meal Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Perencana Menu Mingguan
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-1 font-normal">
            Atur jadwal menu harian untuk Anda dan keluarga. Hemat waktu berbelanja dengan fitur
            ekspor otomatis ke daftar belanja.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportToGrocery}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm shadow-md transition-all ${
            exportedSuccess
              ? "bg-emerald-600 text-white"
              : "bg-orange-600 hover:bg-orange-500 text-white hover:scale-105 active:scale-95 shadow-orange-600/30"
          }`}
        >
          {exportedSuccess ? <Check className="w-5 h-5 stroke-[3]" /> : <ShoppingCart className="w-5 h-5" />}
          <span>
            {exportedSuccess
              ? "Bahan Berhasil Diekspor!"
              : "Ekspor Semua Bahan ke Daftar Belanja"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Quick Add Form (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <form
            onSubmit={handleAddPlan}
            className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4"
          >
            <h2 className="text-base font-extrabold text-neutral-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-orange-600" />
              <span>Jadwalkan Menu Baru</span>
            </h2>

            <div className="space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Pilih Resep</label>
                <select
                  value={selectedRecipeSlug}
                  onChange={(e) => setSelectedRecipeSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white font-bold text-neutral-900 text-sm"
                >
                  {MOCK_RECIPES.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white text-xs font-bold text-neutral-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Waktu Makan</label>
                  <select
                    value={selectedMealType}
                    onChange={(e) => setSelectedMealType(e.target.value as "BREAKFAST" | "LUNCH" | "DINNER")}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white text-xs font-bold text-neutral-900"
                  >
                    <option value="BREAKFAST">Sarapan</option>
                    <option value="LUNCH">Makan Siang</option>
                    <option value="DINNER">Makan Malam</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">Jumlah Porsi</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={selectedServings}
                  onChange={(e) => setSelectedServings(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white text-xs font-bold text-neutral-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-orange-600 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Tambahkan ke Kalender</span>
              </button>
            </div>
          </form>
        </div>

        {/* Meal Plan Timeline & List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-neutral-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span>Daftar Menu Terjadwal ({mealPlans.length})</span>
            </h2>
            <Link
              href="/grocery"
              className="text-xs font-black text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1"
            >
              <span>Buka Smart Grocery</span>
              <span>→</span>
            </Link>
          </div>

          <div className="space-y-3">
            {mealPlans.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-neutral-200">
                <p className="text-neutral-700 font-semibold text-sm">
                  Belum ada resep yang dijadwalkan. Tambahkan resep pertama Anda di samping!
                </p>
              </div>
            ) : (
              mealPlans.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-3xl bg-white border border-neutral-200 hover:border-orange-200 shadow-xs flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                      <Image
                        src={item.recipeCover}
                        alt={item.recipeTitle}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-700 text-white shadow-xs">
                          {item.mealType}
                        </span>
                        <span className="text-xs text-neutral-700 font-bold">
                          {item.date} • {item.servings} Porsi
                        </span>
                      </div>

                      <Link href={`/recipes/${item.recipeSlug}`}>
                        <h3 className="text-base font-extrabold text-neutral-900 hover:text-orange-600 transition-colors line-clamp-1">
                          {item.recipeTitle}
                        </h3>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/recipes/${item.recipeSlug}/cook?servings=${item.servings}`}
                      className="px-3.5 py-2 rounded-xl bg-orange-100 text-orange-950 hover:bg-orange-600 hover:text-white font-black text-xs transition-colors hidden sm:inline-flex items-center gap-1.5 border border-orange-300"
                    >
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Masak</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeletePlan(item.id)}
                      className="p-2 rounded-xl text-neutral-500 hover:text-rose-600 hover:bg-neutral-100 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
