import { notFound } from "next/navigation";
import { MOCK_RECIPES } from "@/data/mock-recipes";
import { RecipeDetailView } from "./recipe-detail-view";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOCK_RECIPES.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    return {
      title: "Resep Tidak Ditemukan - Resepy",
    };
  }

  return {
    title: `${recipe.title} - Resep Interaktif | Resepy`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeDetailView recipe={recipe} />;
}
