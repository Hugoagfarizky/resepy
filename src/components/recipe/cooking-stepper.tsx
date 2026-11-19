"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RecipeFull } from "@/types/recipe";
import { StepTimer } from "./step-timer";
import confetti from "canvas-confetti";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  ListFilter,
  Eye,
  RotateCcw,
} from "lucide-react";
import { formatQuantity, getUnitDisplayLabel } from "@/lib/units/format";

interface CookingStepperProps {
  recipe: RecipeFull;
  targetServings: number;
}

export function CookingStepper({ recipe, targetServings }: CookingStepperProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const steps = recipe.steps;
  const currentStep = steps[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  // Screen Wake Lock API to prevent device screen from sleeping while cooking
  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;

    const requestWakeLock = async () => {
      try {
        if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
        }
      } catch {
        // WakeLock request can fail if low battery or tab in background
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release().catch(() => {});
      }
    };
  }, []);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
      // Fire celebration confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Top Bar Navigation */}
      <header className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href={`/recipes/${recipe.slug}`}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
            title="Keluar dari Cooking Mode"
          >
            <X className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-neutral-100 line-clamp-1">
              {recipe.title}
            </h1>
            <p className="text-xs text-orange-400 font-semibold">
              Mode Dapur ({targetServings} Porsi) • Layar Tetap Menyala (WakeLock Aktif)
            </p>
          </div>
        </div>

        {/* Quick Drawer Button to View Ingredients */}
        <button
          type="button"
          onClick={() => setShowIngredientsDrawer(!showIngredientsDrawer)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-orange-600 text-neutral-200 hover:text-white text-xs font-bold transition-colors"
        >
          <ListFilter className="w-4 h-4" />
          <span>Lihat Bahan</span>
        </button>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-neutral-800 h-1.5">
        <div
          className="bg-orange-500 h-1.5 transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Instruction Display (Extra Large Typography for Kitchen Use) */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full px-6 py-10 relative">
        {isCompleted ? (
          /* Finished Celebration State */
          <div className="text-center space-y-6 py-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-linear-to-tr from-amber-500 to-orange-600 flex items-center justify-center mx-auto text-white shadow-2xl shadow-orange-500/40">
              <Sparkles className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Selamat! Hidangan Siap!
              </h2>
              <p className="text-neutral-400 text-base md:text-lg max-w-lg mx-auto">
                Anda telah menyelesaikan seluruh langkah memasak{" "}
                <span className="text-orange-400 font-semibold">{recipe.title}</span>.
                Waktunya menikmati hidangan lezat buatan Anda!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi dari Langkah 1</span>
              </button>

              <Link
                href={`/recipes/${recipe.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/30 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesai & Kembali ke Resep</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Current Step Details */
          <div className="space-y-8">
            {/* Step Counter Tag */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-black tracking-widest text-orange-400 bg-orange-950/80 border border-orange-800/80 px-3.5 py-1 rounded-full">
                Langkah {currentStepIndex + 1} dari {steps.length}
              </span>

              {currentStep.timerSeconds && (
                <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-1">
                  <StepTimer
                    totalSeconds={currentStep.timerSeconds}
                    label={currentStep.timerLabel}
                  />
                </div>
              )}
            </div>

            {/* Instruction Body with Large Font */}
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-100 leading-snug tracking-tight">
              {currentStep.instruction}
            </p>

            {/* Chef Tip Box if available */}
            {currentStep.chefTip && (
              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-700/50 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-0.5">
                    Chef’s Secret Tip
                  </h4>
                  <p className="text-sm text-amber-200/90 leading-relaxed">
                    {currentStep.chefTip}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Side Drawer for Quick Ingredients Peek */}
      {showIngredientsDrawer && (
        <aside className="fixed inset-y-0 right-0 w-full sm:w-96 bg-neutral-900 border-l border-neutral-800 z-50 p-6 overflow-y-auto space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-orange-400" />
              <span>Bahan ({targetServings} Porsi)</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowIngredientsDrawer(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {recipe.components.map((comp) => (
              <div key={comp.id} className="space-y-2">
                <h4 className="text-xs font-black uppercase text-orange-400 tracking-wider">
                  {comp.title}
                </h4>
                <ul className="text-sm space-y-1.5 text-neutral-300 divide-y divide-neutral-800/60">
                  {comp.ingredients.map((ing) => {
                    const scaled = (ing.quantity * targetServings) / recipe.defaultServings;
                    return (
                      <li key={ing.id} className="pt-1.5 flex justify-between gap-2">
                        <span>{ing.name}</span>
                        <span className="font-mono text-orange-300 font-bold">
                          {formatQuantity(scaled)} {getUnitDisplayLabel(ing.unit)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* Bottom Sticky Controls */}
      <footer className="px-6 py-5 border-t border-neutral-800 bg-neutral-900/90 backdrop-blur-md flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStepIndex === 0 || isCompleted}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-sm font-bold text-neutral-200 transition-all active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Langkah Sebelumnya</span>
        </button>

        <span className="text-xs font-semibold text-neutral-400">
          Gunakan tombol atau swipe untuk navigasi
        </span>

        <button
          type="button"
          onClick={handleNext}
          disabled={isCompleted}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-600 hover:bg-orange-500 text-sm font-bold text-white shadow-lg shadow-orange-600/30 transition-all active:scale-95"
        >
          <span>
            {currentStepIndex === steps.length - 1 ? "Selesaikan Masak!" : "Langkah Berikutnya"}
          </span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
}
