"use client";

import { useState } from "react";
import { MOCK_RECIPES } from "@/data/mock-recipes";
import { RecipeCard } from "@/components/recipe/recipe-card";
import { Search, SlidersHorizontal, Compass, X } from "lucide-react";

export function ExploreClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [selectedDiet, setSelectedDiet] = useState<string>("ALL");
  const [maxMinutes, setMaxMinutes] = useState<number>(0); // 0 = all

  const filteredRecipes = MOCK_RECIPES.filter((recipe) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = recipe.title.toLowerCase().includes(q);
      const descMatch = recipe.description.toLowerCase().includes(q);
      const ingMatch = recipe.components.some((c) =>
        c.ingredients.some((i) => i.name.toLowerCase().includes(q))
      );
      if (!titleMatch && !descMatch && !ingMatch) return false;
    }

    // Difficulty filter
    if (selectedDifficulty !== "ALL" && recipe.difficulty !== selectedDifficulty) {
      return false;
    }

    // Diet filter
    if (selectedDiet !== "ALL" && !recipe.dietaryTags.includes(selectedDiet as any)) {
      return false;
    }

    // Time filter
    if (maxMinutes > 0) {
      const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
      if (totalTime > maxMinutes) return false;
    }

    return true;
  });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("ALL");
    setSelectedDiet("ALL");
    setMaxMinutes(0);
  };

  const hasActiveFilter =
    searchQuery || selectedDifficulty !== "ALL" || selectedDiet !== "ALL" || maxMinutes > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-orange-600" />
            <span>Katalog Kuliner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Eksplorasi Resep Pilihan
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-1 font-normal">
            Temukan inspirasi masakan nusantara dan internasional dengan filter diet, tingkat
            kesulitan, dan durasi memasak.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/90 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama hidangan, bumbu, atau bahan (misal: santan, ayam, katsu)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 text-sm font-semibold text-neutral-900 bg-white placeholder:text-neutral-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-neutral-800 font-extrabold mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-600" />
              <span>Filter:</span>
            </div>

            {/* Diet Dropdown */}
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-neutral-300 bg-white font-bold text-neutral-900 focus:border-orange-500"
            >
              <option value="ALL">Semua Diet</option>
              <option value="HALAL">Halal</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="GLUTEN_FREE">Gluten Free</option>
              <option value="DAIRY_FREE">Dairy Free</option>
            </select>

            {/* Difficulty Dropdown */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-neutral-300 bg-white font-bold text-neutral-900 focus:border-orange-500"
            >
              <option value="ALL">Semua Kesulitan</option>
              <option value="EASY">Mudah (Easy)</option>
              <option value="MEDIUM">Sedang (Medium)</option>
              <option value="HARD">Sulit (Hard)</option>
            </select>

            {/* Time Filter Buttons */}
            <div className="flex items-center gap-1 bg-neutral-200/70 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMaxMinutes(0)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  maxMinutes === 0
                    ? "bg-orange-600 text-white shadow-xs"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                Semua Waktu
              </button>
              <button
                type="button"
                onClick={() => setMaxMinutes(30)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  maxMinutes === 30
                    ? "bg-orange-600 text-white shadow-xs"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                &le; 30 Menit
              </button>
              <button
                type="button"
                onClick={() => setMaxMinutes(60)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  maxMinutes === 60
                    ? "bg-orange-600 text-white shadow-xs"
                    : "text-neutral-700 hover:text-neutral-950"
                }`}
              >
                &le; 60 Menit
              </button>
            </div>
          </div>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-orange-600 hover:text-orange-700 font-extrabold flex items-center gap-1 py-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-neutral-700 font-bold">
          <span>Menampilkan {filteredRecipes.length} resep ditemukan</span>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-neutral-200 space-y-2">
            <p className="text-neutral-800 font-black text-base">Tidak ada resep yang cocok dengan kriteria filter.</p>
            <p className="text-xs text-neutral-600 font-medium">Coba ubah kata kunci pencarian atau reset filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
