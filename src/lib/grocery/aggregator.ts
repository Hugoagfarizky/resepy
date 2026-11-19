import { GroceryItem, RecipeFull, UnitType } from "@/types/recipe";

/**
 * Mengagregasi bahan dari kumpulan resep menjadi daftar belanja terpadu
 * Menggabungkan kuantitas dengan nama dan satuan yang cocok
 */
export function aggregateGroceryList(
  recipesWithServings: { recipe: RecipeFull; targetServings: number }[]
): GroceryItem[] {
  const itemMap = new Map<string, GroceryItem>();

  recipesWithServings.forEach(({ recipe, targetServings }) => {
    const scaleRatio = targetServings / recipe.defaultServings;

    recipe.components.forEach((component) => {
      component.ingredients.forEach((ing) => {
        // Kunci unik berdasarkan nama bahan dan satuan
        const key = `${ing.name.toLowerCase().trim()}_${ing.unit}`;
        const scaledQty = Math.round(ing.quantity * scaleRatio * 100) / 100;

        if (itemMap.has(key)) {
          const existing = itemMap.get(key)!;
          existing.totalQuantity = Math.round((existing.totalQuantity + scaledQty) * 100) / 100;
          if (!existing.sources.includes(recipe.title)) {
            existing.sources.push(recipe.title);
          }
        } else {
          itemMap.set(key, {
            id: `grocery_${ing.id}_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
            ingredientId: ing.ingredientId,
            name: ing.name,
            totalQuantity: scaledQty,
            unit: ing.unit as UnitType,
            category: ing.category || "Lain-lain",
            isChecked: false,
            sources: [recipe.title],
          });
        }
      });
    });
  });

  return Array.from(itemMap.values()).sort((a, b) => {
    // Kelompokkan berdasarkan kategori
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });
}

/**
 * Mengelompokkan item belanja berdasarkan lorong / kategori supermarket
 */
export function groupGroceryByCategory(
  items: GroceryItem[]
): Record<string, GroceryItem[]> {
  const groups: Record<string, GroceryItem[]> = {};

  items.forEach((item) => {
    const cat = item.category || "Lain-lain";
    if (!groups[cat]) {
      groups[cat] = [];
    }
    groups[cat].push(item);
  });

  return groups;
}
