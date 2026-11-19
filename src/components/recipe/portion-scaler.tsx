"use client";

import { Minus, Plus, Users } from "lucide-react";

interface PortionScalerProps {
  currentServings: number;
  baseServings: number;
  onChange: (servings: number) => void;
  min?: number;
  max?: number;
}

export function PortionScaler({
  currentServings,
  baseServings,
  onChange,
  min = 1,
  max = 24,
}: PortionScalerProps) {
  const handleDecrement = () => {
    if (currentServings > min) {
      onChange(currentServings - 1);
    }
  };

  const handleIncrement = () => {
    if (currentServings < max) {
      onChange(currentServings + 1);
    }
  };

  const isModified = currentServings !== baseServings;

  return (
    <div className="inline-flex items-center gap-3 p-1.5 bg-neutral-100 rounded-2xl border border-neutral-200 shadow-inner">
      <div className="flex items-center gap-1.5 px-3 py-1">
        <Users className="w-4 h-4 text-orange-600" />
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
          Porsi:
        </span>
      </div>

      <button
        type="button"
        onClick={handleDecrement}
        disabled={currentServings <= min}
        aria-label="Kurangi porsi"
        className="w-8 h-8 rounded-xl bg-white text-neutral-800 hover:bg-orange-500 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-800 flex items-center justify-center font-bold transition-all shadow-xs active:scale-95"
      >
        <Minus className="w-4 h-4" />
      </button>

      <div className="min-w-10 text-center">
        <span className="text-lg font-black text-neutral-900 tracking-tight">
          {currentServings}
        </span>
        {isModified && (
          <span className="block text-[10px] text-orange-600 font-bold -mt-1">
            (Asli: {baseServings})
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={currentServings >= max}
        aria-label="Tambah porsi"
        className="w-8 h-8 rounded-xl bg-white text-neutral-800 hover:bg-orange-500 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-neutral-800 flex items-center justify-center font-bold transition-all shadow-xs active:scale-95"
      >
        <Plus className="w-4 h-4" />
      </button>

      {isModified && (
        <button
          type="button"
          onClick={() => onChange(baseServings)}
          className="text-xs font-medium text-neutral-500 hover:text-orange-600 underline px-2 transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}
