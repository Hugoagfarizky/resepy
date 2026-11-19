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
          <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Katalog Kuliner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Eksplorasi Resep Pilihan
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1">
            Temukan inspirasi masakan nusantara dan internasional dengan filter diet, tingkat
            kesulitan, dan durasi memasak.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-200/90 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama hidangan, bumbu, atau bahan (misal: santan, ayam, katsu)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-neutral-200 focus:outline-hidden focus:border-orange-500 text-sm font-medium bg-neutral-50/70 focus:bg-white transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-neutral-500 font-bold mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-600" />
              <span>Filter:</span>
            </div>

            {/* Diet Dropdown */}
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white font-semibold text-neutral-700"
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
              className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white font-semibold text-neutral-700"
            >
              <option value="ALL">Semua Kesulitan</option>
              <option value="EASY">Mudah (Easy)</option>
              <option value="MEDIUM">Sedang (Medium)</option>
              <option value="HARD">Sulit (Hard)</option>
            </select>

            {/* Time Filter Buttons */}
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMaxMinutes(0)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  maxMinutes === 0 ? "bg-white text-orange-700 shadow-xs" : "text-neutral-600"
                }`}
              >
                Semua Waktu
              </button>
              <button
                type="button"
                onClick={() => setMaxMinutes(30)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  maxMinutes === 30 ? "bg-white text-orange-700 shadow-xs" : "text-neutral-600"
                }`}
              >
                &le; 30 Menit
              </button>
              <button
                type="button"
                onClick={() => setMaxMinutes(60)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  maxMinutes === 60 ? "bg-white text-orange-700 shadow-xs" : "text-neutral-600"
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
              className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
          <span>Menampilkan {filteredRecipes.length} resep ditemukan</span>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-neutral-50 border border-neutral-200 space-y-2">
            <p className="text-neutral-600 font-bold">Tidak ada resep yang cocok dengan kriteria filter.</p>
            <p className="text-xs text-neutral-400">Coba ubah kata kunci pencarian atau reset filter.</p>
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
