export type UnitType =
  // Metrik Baku
  | "GRAM"
  | "KILOGRAM"
  | "MILLILITER"
  | "LITER"
  // Imperial Baku
  | "OUNCE"
  | "POUND"
  | "CUP"
  | "TABLESPOON"
  | "TEASPOON"
  // Satuan Kuliner Indonesia & Satuan Natural
  | "RUAS"
  | "SIUNG"
  | "BUTIR"
  | "LEMBAR"
  | "IKAT"
  | "BATANG"
  | "POTONG"
  | "SECUKUPNYA"
  | "SEJUMPUT";

export type DietType =
  | "HALAL"
  | "VEGETARIAN"
  | "VEGAN"
  | "GLUTEN_FREE"
  | "DAIRY_FREE"
  | "KETO"
  | "LOW_CARB";

export type Allergen =
  | "PEANUT"
  | "TREE_NUT"
  | "DAIRY"
  | "EGG"
  | "GLUTEN"
  | "SOY"
  | "SEAFOOD"
  | "FISH"
  | "SESAME";

export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT";

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

export interface IngredientMaster {
  id: string;
  name: string;
  category: string; // e.g., "Bumbu & Rempah", "Sayuran", "Daging & Unggas", "Saus & Minyak"
  defaultUnit: UnitType;
  caloriesPer100g?: number;
  proteinPer100g?: number;
  fatPer100g?: number;
  carbsPer100g?: number;
  fiberPer100g?: number;
  densityGPerMl?: number; // density in grams per ml (default 1.0)
  allergens?: Allergen[];
}

export interface RecipeIngredientItem {
  id: string;
  ingredientId: string;
  name: string;
  quantity: number;
  unit: UnitType;
  preparation?: string; // e.g. "cincang halus", "kocok lepas", "sangrai"
  isOptional?: boolean;
  category?: string;
  allergens?: Allergen[];
  caloriesPer100g?: number;
  proteinPer100g?: number;
  fatPer100g?: number;
  carbsPer100g?: number;
}

export interface RecipeComponentGroup {
  id: string;
  title: string; // e.g. "Bumbu Halus", "Bahan Marinasi Ayam", "Kuah Santan"
  orderIndex: number;
  ingredients: RecipeIngredientItem[];
}

export interface RecipeStepItem {
  id: string;
  stepNumber: number;
  instruction: string;
  timerSeconds?: number;
  timerLabel?: string;
  imageUrl?: string;
  chefTip?: string;
}

export interface RecipeFull {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  authorName: string;
  authorAvatar?: string;
  defaultServings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: Difficulty;
  dietaryTags: DietType[];
  originRegion?: string;
  rating: number;
  ratingCount: number;
  components: RecipeComponentGroup[];
  steps: RecipeStepItem[];
  parentRecipeTitle?: string;
}

export interface PantryItemData {
  id: string;
  ingredientId: string;
  name: string;
  quantity: number;
  unit: UnitType;
  category: string;
  expiryDate?: string;
}

export interface MealPlanDayEntry {
  id: string;
  recipeId: string;
  recipeTitle: string;
  recipeSlug: string;
  recipeCover: string;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  servings: number;
}

export interface GroceryItem {
  id: string;
  ingredientId: string;
  name: string;
  totalQuantity: number;
  unit: UnitType;
  category: string;
  isChecked: boolean;
  sources: string[]; // List of recipe titles requesting this item
}
