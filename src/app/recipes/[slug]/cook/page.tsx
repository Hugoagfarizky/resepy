import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MOCK_RECIPES } from "@/data/mock-recipes";
import { CookingStepper } from "@/components/recipe/cooking-stepper";
import type { Metadata } from "next";

interface CookPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ servings?: string }>;
}

export function generateStaticParams() {
  return MOCK_RECIPES.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: CookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = MOCK_RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    return { title: "Mode Memasak - Luminaire Kitchen" };
  }

  return {
    title: `Memasak: ${recipe.title} (Cooking Mode) | Luminaire Kitchen`,
    description: `Panduan memasak layar penuh langkah demi langkah untuk ${recipe.title}`,
  };
}

async function CookContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ servings?: string }>;
}) {
  const { slug } = await params;
  const { servings } = await searchParams;

  const recipe = MOCK_RECIPES.find((r) => r.slug === slug);

  if (!recipe) {
    notFound();
  }

  const targetServings = servings
    ? parseInt(servings, 10) || recipe.defaultServings
    : recipe.defaultServings;

  return <CookingStepper recipe={recipe} targetServings={targetServings} />;
}

export default function CookingModePage({ params, searchParams }: CookPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-bold">Memuat Mode Dapur...</span>
          </div>
        </div>
      }
    >
      <CookContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
