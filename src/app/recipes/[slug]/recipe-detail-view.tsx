"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RecipeFull } from "@/types/recipe";
import { PortionScaler } from "@/components/recipe/portion-scaler";
import { IngredientList } from "@/components/recipe/ingredient-list";
import { NutritionBadge } from "@/components/recipe/nutrition-badge";
import { StepTimer } from "@/components/recipe/step-timer";
import { calculateRecipeNutrition } from "@/lib/nutrition/calculator";
import { aggregateGroceryList } from "@/lib/grocery/aggregator";
import {
  Clock,
  Flame,
  ChefHat,
  Play,
  CalendarPlus,
  ShoppingCart,
  GitFork,
  Lightbulb,
  Check,
  Share2,
} from "lucide-react";

interface RecipeDetailViewProps {
  recipe: RecipeFull;
}

export function RecipeDetailView({ recipe }: RecipeDetailViewProps) {
  const [servings, setServings] = useState<number>(recipe.defaultServings);
  const [addedToGrocery, setAddedToGrocery] = useState<boolean>(false);
  const [addedToMealPlan, setAddedToMealPlan] = useState<boolean>(false);

  // Recalculate nutrition dynamically based on current servings
  const nutrition = calculateRecipeNutrition(recipe.components, servings);
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const handleAddToGrocery = () => {
    try {
      const existingStr = localStorage.getItem("luminaire_grocery_items");
      const existingItems = existingStr ? JSON.parse(existingStr) : [];
      const newItems = aggregateGroceryList([{ recipe, targetServings: servings }]);
      const combined = [...existingItems, ...newItems];
      localStorage.setItem("luminaire_grocery_items", JSON.stringify(combined));
      setAddedToGrocery(true);
      setTimeout(() => setAddedToGrocery(false), 3000);
    } catch {
      setAddedToGrocery(true);
    }
  };

  const handleAddToMealPlan = () => {
    try {
      const existingStr = localStorage.getItem("luminaire_meal_plans");
      const existingPlans = existingStr ? JSON.parse(existingStr) : [];
      const newPlan = {
        id: `mp_${Date.now()}`,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        recipeSlug: recipe.slug,
        recipeCover: recipe.coverImage,
        date: new Date().toISOString().split("T")[0],
        mealType: "DINNER",
        servings: servings,
      };
      localStorage.setItem("luminaire_meal_plans", JSON.stringify([...existingPlans, newPlan]));
      setAddedToMealPlan(true);
      setTimeout(() => setAddedToMealPlan(false), 3000);
    } catch {
      setAddedToMealPlan(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Fork Attribution Banner */}
      {recipe.parentRecipeTitle && (
        <div className="p-4 rounded-2xl bg-orange-100/90 border border-orange-300 flex items-center justify-between text-xs text-orange-950 font-medium">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-orange-700 stroke-[2.5]" />
            <span>
              Resep ini merupakan modifikasi / variasi dari:{" "}
              <strong className="font-black underline">{recipe.parentRecipeTitle}</strong>
            </span>
          </div>
          <span className="font-black bg-orange-200 px-2 py-0.5 rounded-md">Versi Adaptasi</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {recipe.originRegion && (
            <span className="text-xs font-black px-3 py-1 rounded-full bg-neutral-900 text-white shadow-xs">
              {recipe.originRegion}
            </span>
          )}
          {recipe.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-black px-3 py-1 rounded-full bg-emerald-700 text-white shadow-xs"
            >
              {tag}
            </span>
          ))}
          <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
            Tingkat: {recipe.difficulty}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-tight">
          {recipe.title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-700 leading-relaxed max-w-3xl font-normal">
          {recipe.description}
        </p>

        {/* Author & Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center font-bold text-orange-700">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-semibold text-neutral-500">Kreasi Resep oleh</span>
              <span className="text-sm font-extrabold text-neutral-900">{recipe.authorName}</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-sm font-bold text-neutral-800">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>Prep: {recipe.prepTimeMinutes}m • Masak: {recipe.cookTimeMinutes}m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>{nutrition.perServing.calories} kkal / porsi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image & Quick Action Floating Banner */}
      <section className="relative rounded-3xl overflow-hidden aspect-16/9 md:aspect-21/9 shadow-lg bg-neutral-100 border border-neutral-200">
        <Image
          src={recipe.coverImage}
          alt={recipe.title}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover"
        />

        {/* High Contrast Overlay CTA: Cooking Mode Button */}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950/95 via-neutral-950/50 to-transparent flex items-end p-6 sm:p-8">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            <div className="text-white space-y-1">
              <span className="text-xs uppercase font-black tracking-widest text-orange-300 bg-neutral-900/80 px-2.5 py-0.5 rounded-md inline-block">
                Siap Memasak di Dapur?
              </span>
              <p className="text-sm sm:text-base font-semibold text-neutral-100">
                Mode interaktif bebas-genggam dengan layar tetap menyala & audio timer per langkah.
              </p>
            </div>

            <Link
              href={`/recipes/${recipe.slug}/cook?servings=${servings}`}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm sm:text-base shadow-xl shadow-orange-600/50 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Mulai Masak ({servings} Porsi)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Control Bar: Portion Scaler & Utility Actions */}
      <section className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
        <PortionScaler
          currentServings={servings}
          baseServings={recipe.defaultServings}
          onChange={setServings}
        />

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleAddToMealPlan}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border transition-all ${
              addedToMealPlan
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "bg-white border-neutral-300 text-neutral-900 hover:bg-neutral-50 shadow-2xs"
            }`}
          >
            {addedToMealPlan ? <Check className="w-4 h-4 stroke-[3]" /> : <CalendarPlus className="w-4 h-4 text-orange-600" />}
            <span>{addedToMealPlan ? "Ditambahkan!" : "+ Meal Plan"}</span>
          </button>

          <button
            type="button"
            onClick={handleAddToGrocery}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border transition-all ${
              addedToGrocery
                ? "bg-emerald-600 border-emerald-600 text-white"
                : "bg-white border-neutral-300 text-neutral-900 hover:bg-neutral-50 shadow-2xs"
            }`}
          >
            {addedToGrocery ? <Check className="w-4 h-4 stroke-[3]" /> : <ShoppingCart className="w-4 h-4 text-orange-600" />}
            <span>{addedToGrocery ? "Tersimpan di Belanja!" : "+ Daftar Belanja"}</span>
          </button>
        </div>
      </section>

      {/* Main 2-Column Content: Ingredients & Nutrition (Left), Instructions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Ingredients & Nutrition */}
        <div className="lg:col-span-5 space-y-8">
          <IngredientList
            components={recipe.components}
            baseServings={recipe.defaultServings}
            currentServings={servings}
          />

          <NutritionBadge nutrition={nutrition} servings={servings} />
        </div>

        {/* Right Column: Step-by-Step Instructions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">
              Instruksi Memasak ({recipe.steps.length} Langkah)
            </h3>
            <span className="text-xs text-neutral-600 font-bold">
              Total durasi ± {totalTime} menit
            </span>
          </div>

          <div className="space-y-6">
            {recipe.steps.map((step) => (
              <div
                key={step.id}
                className="group p-6 rounded-3xl border border-neutral-200/90 bg-white hover:border-orange-300 hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                      {step.stepNumber}
                    </span>
                    <h4 className="text-sm font-extrabold text-neutral-900">
                      Langkah {step.stepNumber}
                    </h4>
                  </div>

                  {step.timerSeconds && (
                    <StepTimer
                      totalSeconds={step.timerSeconds}
                      label={step.timerLabel}
                    />
                  )}
                </div>

                <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                  {step.instruction}
                </p>

                {step.chefTip && (
                  <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-950 leading-relaxed font-medium">
                      <strong className="font-black text-amber-900">Tips Koki:</strong> {step.chefTip}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* End CTA */}
          <div className="pt-6 text-center">
            <Link
              href={`/recipes/${recipe.slug}/cook?servings=${servings}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-neutral-900 hover:bg-orange-600 text-white font-black text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Buka Cooking Mode Layar Penuh</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
