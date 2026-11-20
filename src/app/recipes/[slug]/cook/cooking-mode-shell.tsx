"use client";

import { useSearchParams } from "next/navigation";
import { CookingStepper } from "@/components/recipe/cooking-stepper";
import type { RecipeFull } from "@/types/recipe";

/**
 * Membaca `?servings=` di sisi klien. Static export tidak bisa memakai
 * `searchParams` di server component, jadi pembacaan dipindah ke sini.
 */
export function CookingModeShell({ recipe }: { recipe: RecipeFull }) {
  const searchParams = useSearchParams();
  const raw = searchParams.get("servings");
  const parsed = raw ? parseInt(raw, 10) : NaN;
  const targetServings =
    Number.isFinite(parsed) && parsed > 0 ? parsed : recipe.defaultServings;

  return <CookingStepper recipe={recipe} targetServings={targetServings} />;
}
