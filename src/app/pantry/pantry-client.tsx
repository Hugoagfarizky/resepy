"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PantryItemData, RecipeFull, UnitType } from "@/types/recipe";
import { INITIAL_PANTRY_ITEMS, MOCK_RECIPES } from "@/data/mock-recipes";
import { matchRecipesWithPantry } from "@/lib/pantry/matcher";
import { formatQuantity, getUnitDisplayLabel } from "@/lib/units/format";
import {
  Refrigerator,
  Plus,
  Trash2,
  AlertTriangle,
  Sparkles,
  CookingPot,
  ArrowRight,
  CheckCircle,
  Calendar,
} from "lucide-react";

export function PantryClient() {
  const [pantryItems, setPantryItems] = useState<PantryItemData[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [nowMs, setNowMs] = useState<number>(0);

  // New item form state
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty] = useState("1");
  const [newUnit, setNewUnit] = useState<UnitType>("BUTIR");
  const [newCategory, setNewCategory] = useState("Bahan Pokok");
  const [newExpiry, setNewExpiry] = useState("");

  // Load from local storage or initial mock
  useEffect(() => {
    setNowMs(Date.now());
    try {
      const stored = localStorage.getItem("luminaire_pantry_items");
      if (stored) {
        setPantryItems(JSON.parse(stored));
      } else {
        setPantryItems(INITIAL_PANTRY_ITEMS);
      }
    } catch {
      setPantryItems(INITIAL_PANTRY_ITEMS);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage on changes
  const saveItems = (updated: PantryItemData[]) => {
    setPantryItems(updated);
    try {
      localStorage.setItem("luminaire_pantry_items", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newItem: PantryItemData = {
      id: `pantry_${Date.now()}`,
      ingredientId: `ing_${Date.now()}`,
      name: newName.trim(),
      quantity: parseFloat(newQty) || 1,
      unit: newUnit,
      category: newCategory,
      expiryDate: newExpiry || undefined,
    };

    saveItems([...pantryItems, newItem]);
    setNewName("");
    setNewQty("1");
    setNewExpiry("");
  };

  const handleDeleteItem = (id: string) => {
    saveItems(pantryItems.filter((i) => i.id !== id));
  };

  // Run reverse matching against mock recipes
  const matchedResults = matchRecipesWithPantry(MOCK_RECIPES, pantryItems, nowMs);

  if (!isLoaded) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-wider mb-1">
            <Refrigerator className="w-4 h-4 text-orange-600" />
            <span>Pantry & Kulkas Pintar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Masak dari Apa yang Ada di Kulkas
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-1 font-normal">
            Catat bahan makanan di dapur Anda. Mesin kami akan merekomendasikan resep yang paling
            cocok dan memprioritaskan bahan yang mendekati masa kedaluwarsa.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Pantry Inventory Form & List (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-6">
            <h2 className="text-base font-extrabold text-neutral-900 flex items-center justify-between">
              <span>Persediaan Bahan ({pantryItems.length})</span>
              <span className="text-xs font-bold text-neutral-500">Tersimpan otomatis</span>
            </h2>

            {/* Quick Add Form */}
            <form onSubmit={handleAddItem} className="space-y-3 p-4 rounded-2xl bg-neutral-100/70 border border-neutral-200/90">
              <span className="text-xs font-black text-neutral-900 block">
                + Tambah Bahan ke Kulkas
              </span>

              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Nama bahan (contoh: Bawang Merah, Daging Ayam)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-900 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white placeholder:text-neutral-500"
                  required
                />

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="any"
                      min="0.1"
                      placeholder="Qty"
                      value={newQty}
                      onChange={(e) => setNewQty(e.target.value)}
                      className="w-20 px-3 py-2 text-sm font-bold text-neutral-900 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white"
                      required
                    />
                    <select
                      value={newUnit}
                      onChange={(e) => setNewUnit(e.target.value as UnitType)}
                      className="flex-1 px-2.5 py-2 text-xs rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white font-bold text-neutral-900"
                    >
                      <option value="BUTIR">Butir</option>
                      <option value="SIUNG">Siung</option>
                      <option value="RUAS">Ruas</option>
                      <option value="GRAM">Gram (g)</option>
                      <option value="KILOGRAM">Kilogram (kg)</option>
                      <option value="MILLILITER">ml</option>
                      <option value="TABLESPOON">sdm</option>
                      <option value="TEASPOON">sdt</option>
                      <option value="IKAT">Ikat</option>
                      <option value="POTONG">Potong</option>
                    </select>
                  </div>

                  <input
                    type="date"
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-bold text-neutral-900 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white"
                    title="Tanggal Kedaluwarsa (opsional)"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Simpan Bahan</span>
              </button>
            </form>

            {/* Inventory Items List */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {pantryItems.length === 0 ? (
                <p className="text-xs text-neutral-500 text-center py-6 font-medium">
                  Belum ada bahan di kulkas. Masukkan bahan yang Anda punya di atas!
                </p>
              ) : (
                pantryItems.map((item) => {
                  const isExpiringSoon =
                    nowMs > 0 &&
                    Boolean(item.expiryDate) &&
                    new Date(item.expiryDate!).getTime() - nowMs < 86400000 * 3;

                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                        isExpiringSoon
                          ? "bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60"
                          : "bg-white border-neutral-200/90"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-neutral-900">{item.name}</span>
                          {isExpiringSoon && (
                            <span className="flex items-center gap-1 text-[10px] font-black text-white bg-amber-600 px-2 py-0.5 rounded-md shadow-2xs">
                              <AlertTriangle className="w-3 h-3" /> Segera Pakai
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono font-bold text-neutral-700">
                          {formatQuantity(item.quantity)} {getUnitDisplayLabel(item.unit)}
                          {item.expiryDate && (
                            <span className="text-neutral-500 font-sans font-medium"> • Exp: {item.expiryDate}</span>
                          )}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-neutral-500 hover:text-rose-600 p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Matched Recipes Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                Resep yang Bisa Dimasak Sekarang
              </h2>
            </div>
            <span className="text-xs font-black px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200">
              Diurutkan dari % kecocokan tertinggi
            </span>
          </div>

          <div className="space-y-4">
            {matchedResults.map(({ recipe, matchPercentage, availableCount, totalRequiredCount, missingIngredients, hasExpiringIngredient }) => {
              const isHighMatch = matchPercentage >= 70;

              return (
                <div
                  key={recipe.id}
                  className={`p-6 rounded-3xl border transition-all ${
                    isHighMatch
                      ? "bg-white border-emerald-400 shadow-md ring-1 ring-emerald-300/60"
                      : "bg-white border-neutral-200 hover:border-orange-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* High Contrast Match Percentage Badge */}
                        <span
                          className={`text-xs font-black px-3 py-1 rounded-full ${
                            matchPercentage >= 70
                              ? "bg-emerald-700 text-white shadow-xs"
                              : matchPercentage >= 40
                              ? "bg-amber-600 text-white shadow-xs"
                              : "bg-neutral-800 text-white"
                          }`}
                        >
                          {matchPercentage}% Bahan Tersedia
                        </span>

                        {hasExpiringIngredient && (
                          <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-500 text-neutral-950 flex items-center gap-1 shadow-2xs">
                            <AlertTriangle className="w-3.5 h-3.5" /> Pakai Bahan Hampir Exp
                          </span>
                        )}

                        <span className="text-xs text-neutral-600 font-bold">
                          ({availableCount} dari {totalRequiredCount} bahan)
                        </span>
                      </div>

                      <Link href={`/recipes/${recipe.slug}`}>
                        <h3 className="text-lg font-black text-neutral-900 hover:text-orange-600 transition-colors">
                          {recipe.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {recipe.description}
                      </p>
                    </div>

                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs shadow-xs transition-colors shrink-0"
                    >
                      <span>Lihat Resep</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Missing ingredients tag breakdown */}
                  {missingIngredients.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-neutral-700 font-bold">Perlu beli tambahan:</span>
                      {missingIngredients.slice(0, 4).map((m) => (
                        <span
                          key={m}
                          className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-900 border border-neutral-300 font-bold"
                        >
                          + {m}
                        </span>
                      ))}
                      {missingIngredients.length > 4 && (
                        <span className="text-neutral-600 font-bold">
                          +{missingIngredients.length - 4} lainnya
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
