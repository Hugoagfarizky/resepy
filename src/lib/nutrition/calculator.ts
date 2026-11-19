import { RecipeComponentGroup, Allergen } from "@/types/recipe";
import { convertToEstimatedGrams } from "../units/converter";

export interface NutritionSummary {
  perServing: {
    calories: number;
    proteinGrams: number;
    fatGrams: number;
    carbsGrams: number;
  };
  total: {
    calories: number;
    proteinGrams: number;
    fatGrams: number;
    carbsGrams: number;
  };
  allergens: Allergen[];
}

/**
 * Menghitung estimasi makronutrisi dan mengagregasi alergen dari seluruh komponen resep
 */
export function calculateRecipeNutrition(
  components: RecipeComponentGroup[],
  servings: number = 4
): NutritionSummary {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;
  const allergenSet = new Set<Allergen>();

  for (const comp of components) {
    for (const ing of comp.ingredients) {
      if (ing.allergens) {
        ing.allergens.forEach((a) => allergenSet.add(a));
      }

      const grams = convertToEstimatedGrams(ing.quantity, ing.unit);
      const factor = grams / 100;

      if (ing.caloriesPer100g) totalCalories += ing.caloriesPer100g * factor;
      if (ing.proteinPer100g) totalProtein += ing.proteinPer100g * factor;
      if (ing.fatPer100g) totalFat += ing.fatPer100g * factor;
      if (ing.carbsPer100g) totalCarbs += ing.carbsPer100g * factor;
    }
  }

  const validServings = servings > 0 ? servings : 1;

  return {
    total: {
      calories: Math.round(totalCalories),
      proteinGrams: Math.round(totalProtein * 10) / 10,
      fatGrams: Math.round(totalFat * 10) / 10,
      carbsGrams: Math.round(totalCarbs * 10) / 10,
    },
    perServing: {
      calories: Math.round(totalCalories / validServings),
      proteinGrams: Math.round((totalProtein / validServings) * 10) / 10,
      fatGrams: Math.round((totalFat / validServings) * 10) / 10,
      carbsGrams: Math.round((totalCarbs / validServings) * 10) / 10,
    },
    allergens: Array.from(allergenSet),
  };
}
