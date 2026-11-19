import { RecipeFull, PantryItemData } from "@/types/recipe";

export interface RecipeMatchResult {
  recipe: RecipeFull;
  matchPercentage: number;
  availableCount: number;
  totalRequiredCount: number;
  missingIngredients: string[];
  hasExpiringIngredient: boolean;
}

/**
 * Mencocokkan isi kulkas (pantry) dengan daftar resep
 * dan mengurutkan berdasarkan persentase ketersediaan bahan tertinggi
 */
export function matchRecipesWithPantry(
  recipes: RecipeFull[],
  pantryItems: PantryItemData[],
  currentDateMs?: number
): RecipeMatchResult[] {
  // Buat set nama bahan kulkas (huruf kecil & trim untuk toleransi pencocokan)
  const pantrySet = new Map<string, PantryItemData>();
  pantryItems.forEach((p) => {
    pantrySet.set(p.name.toLowerCase().trim(), p);
  });

  const nowMs = currentDateMs ?? 0;
  const threeDaysMs = nowMs + 86400000 * 3;

  const results: RecipeMatchResult[] = recipes.map((recipe) => {
    const allIngredients = recipe.components.flatMap((c) => c.ingredients);
    // Bahan non-opsional yang wajib
    const requiredIngredients = allIngredients.filter((i) => !i.isOptional);

    const missingIngredients: string[] = [];
    let availableCount = 0;
    let hasExpiringIngredient = false;

    requiredIngredients.forEach((ing) => {
      const ingNameLower = ing.name.toLowerCase().trim();
      // Periksa apakah nama ada di pantry
      const match = Array.from(pantrySet.entries()).find(
        ([pName]) => pName.includes(ingNameLower) || ingNameLower.includes(pName)
      );

      if (match) {
        availableCount++;
        const pItem = match[1];
        if (pItem.expiryDate && nowMs > 0) {
          const expMs = new Date(pItem.expiryDate).getTime();
          if (expMs <= threeDaysMs) {
            hasExpiringIngredient = true;
          }
        }
      } else {
        missingIngredients.push(ing.name);
      }
    });

    const total = requiredIngredients.length > 0 ? requiredIngredients.length : 1;
    const matchPercentage = Math.round((availableCount / total) * 100);

    return {
      recipe,
      matchPercentage,
      availableCount,
      totalRequiredCount: requiredIngredients.length,
      missingIngredients,
      hasExpiringIngredient,
    };
  });

  // Urutkan: persentase tertinggi dulu, lalu resep yang memanfaatkan bahan mau kedaluwarsa
  return results.sort((a, b) => {
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    if (a.hasExpiringIngredient && !b.hasExpiringIngredient) return -1;
    if (!a.hasExpiringIngredient && b.hasExpiringIngredient) return 1;
    return 0;
  });
}
