import Link from "next/link";
import Image from "next/image";
import { RecipeFull } from "@/types/recipe";
import { Clock, Users, Star, ChefHat, Play } from "lucide-react";

interface RecipeCardProps {
  recipe: RecipeFull;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const difficultyColors = {
    EASY: "bg-neutral-950/85 text-emerald-400 border-emerald-500/40",
    MEDIUM: "bg-neutral-950/85 text-amber-400 border-amber-500/40",
    HARD: "bg-neutral-950/85 text-rose-400 border-rose-500/40",
    EXPERT: "bg-neutral-950/85 text-purple-400 border-purple-500/40",
  };

  return (
    <div className="group bg-white rounded-3xl border border-neutral-200/90 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Cover Image & Badges */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100">
        <Image
          src={recipe.coverImage}
          alt={recipe.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges with High Contrast */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1.5">
            {recipe.originRegion && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-950/90 text-white backdrop-blur-md shadow-xs border border-white/20">
                {recipe.originRegion.split(",")[0]}
              </span>
            )}
            {recipe.dietaryTags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-700 text-white shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <span
            className={`text-[11px] font-black px-2.5 py-1 rounded-full border shadow-xs backdrop-blur-md ${
              difficultyColors[recipe.difficulty]
            }`}
          >
            {recipe.difficulty}
          </span>
        </div>

        {/* Quick Cook Floating Button */}
        <Link
          href={`/recipes/${recipe.slug}/cook`}
          title="Mulai Mode Memasak Layar Penuh"
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg hover:bg-orange-700 hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-200"
        >
          <Play className="w-4 h-4 fill-white ml-0.5" />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Author & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-600 mb-2">
            <span className="flex items-center gap-1.5 font-bold text-neutral-800">
              <ChefHat className="w-3.5 h-3.5 text-orange-600" />
              {recipe.authorName}
            </span>

            <div className="flex items-center gap-1 font-extrabold text-neutral-900">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{recipe.rating}</span>
              <span className="text-neutral-500 font-medium">({recipe.ratingCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/recipes/${recipe.slug}`}>
            <h3 className="text-lg font-black text-neutral-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
              {recipe.title}
            </h3>
          </Link>

          <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed font-normal">
            {recipe.description}
          </p>
        </div>

        {/* Meta Stats Bar */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-700 font-semibold">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>{totalTime} menit</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-orange-600" />
            <span>{recipe.defaultServings} porsi</span>
          </div>

          <span className="text-xs font-black text-orange-600 group-hover:underline">
            Lihat Resep →
          </span>
        </div>
      </div>
    </div>
  );
}
