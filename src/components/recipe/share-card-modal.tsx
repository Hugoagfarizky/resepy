"use client";

import { useState } from "react";
import Image from "next/image";
import { RecipeFull } from "@/types/recipe";
import { formatQuantity, getUnitDisplayLabel } from "@/lib/units/format";
import {
  Share2,
  Copy,
  Check,
  X,
  MessageCircle,
  Sparkles,
  Clock,
  Flame,
  ChefHat,
  Users,
} from "lucide-react";

interface ShareCardModalProps {
  recipe: RecipeFull;
  servings: number;
}

export function ShareCardModal({ recipe, servings }: ShareCardModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyWhatsAppText = () => {
    const scaleRatio = servings / recipe.defaultServings;
    let text = `🍳 *${recipe.title.toUpperCase()}*\n`;
    text += `_${recipe.description}_\n\n`;
    text += `⏱️ *Waktu:* ${totalTime} Menit | 👥 *Porsi:* ${servings} Orang\n`;
    text += `📍 *Asal:* ${recipe.originRegion || "Indonesia"}\n\n`;

    text += `📝 *BAHAN-BAHAN:*\n`;
    recipe.components.forEach((c) => {
      text += `*${c.title}:*\n`;
      c.ingredients.forEach((ing) => {
        const scaled = ing.quantity * scaleRatio;
        text += `• ${ing.name} - ${formatQuantity(scaled)} ${getUnitDisplayLabel(ing.unit)}`;
        if (ing.preparation) text += ` (${ing.preparation})`;
        text += `\n`;
      });
      text += `\n`;
    });

    text += `🔥 *CARA MEMASAK:*\n`;
    recipe.steps.forEach((s) => {
      text += `${s.stepNumber}. ${s.instruction}\n`;
      if (s.timerSeconds) text += `   ⏱ Timer: ${Math.floor(s.timerSeconds / 60)} menit\n`;
    });

    text += `\n🌟 _Resep lengkap & panduan audio masak:_ ${currentUrl}\n`;
    text += `_Dibuat dengan Resepy_`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Resep ${recipe.title} di Resepy: ${recipe.description}`,
          url: currentUrl,
        });
      } catch {
        // Share cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black border border-neutral-300 text-neutral-900 bg-white hover:bg-neutral-50 shadow-2xs transition-all"
        title="Bagikan kartu resep ke WhatsApp atau Media Sosial"
      >
        <Share2 className="w-4 h-4 text-neutral-700" />
        <span>Bagikan Resep</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-6 border border-neutral-200 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-orange-600" />
                <h3 className="text-base font-black text-neutral-900">
                  Bagikan Kartu Resep Kuliner
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Aesthetic Visual Preview Card */}
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md bg-stone-50">
              <div className="relative aspect-16/9 w-full bg-neutral-900">
                <Image
                  src={recipe.coverImage}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-neutral-950/90 via-neutral-950/30 to-transparent flex items-end p-4">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-orange-600">
                      {recipe.originRegion || "Resep Nusantara"}
                    </span>
                    <h4 className="text-lg font-black leading-snug">{recipe.title}</h4>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3 bg-white">
                <div className="grid grid-cols-3 gap-2 text-center text-xs border border-neutral-200 rounded-xl p-2 bg-neutral-50">
                  <div>
                    <span className="block text-[10px] text-neutral-500 font-semibold">Total Waktu</span>
                    <span className="font-extrabold text-neutral-900">{totalTime}m</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500 font-semibold">Porsi</span>
                    <span className="font-extrabold text-neutral-900">{servings} Orang</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500 font-semibold">Tingkat</span>
                    <span className="font-extrabold text-neutral-900">{recipe.difficulty}</span>
                  </div>
                </div>

                <div className="text-xs text-neutral-700 space-y-1">
                  <span className="font-bold text-neutral-900 block text-[11px] uppercase tracking-wider">
                    Bahan Utama Preview:
                  </span>
                  <p className="line-clamp-2 text-neutral-600 font-medium text-[11px]">
                    {recipe.components
                      .flatMap((c) => c.ingredients.map((i) => i.name))
                      .slice(0, 7)
                      .join(", ")}
                    ...
                  </p>
                </div>
              </div>
            </div>

            {/* Share Action Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleCopyWhatsAppText}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                {copiedText ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <MessageCircle className="w-4 h-4 fill-white" />
                )}
                <span>
                  {copiedText
                    ? "Teks Format WhatsApp Berhasil Disalin!"
                    : "Salin Format Rapi untuk WhatsApp"}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Bagikan Link</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 font-bold text-xs text-neutral-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4 text-neutral-600" />}
                  <span>{copiedLink ? "Link Disalin!" : "Salin Link Web"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
