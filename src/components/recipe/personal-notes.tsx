"use client";

import { useState, useEffect } from "react";
import { BookOpen, Star, Check, Sparkles, Calendar, Save } from "lucide-react";

interface PersonalNotesProps {
  recipeId: string;
  recipeTitle: string;
}

export function PersonalNotes({ recipeId, recipeTitle }: PersonalNotesProps) {
  const [noteText, setNoteText] = useState("");
  const [rating, setRating] = useState(0);
  const [lastCookedDate, setLastCookedDate] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const storageKey = `luminaire_note_${recipeId}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.noteText) setNoteText(parsed.noteText);
        if (parsed.rating) setRating(parsed.rating);
        if (parsed.lastCookedDate) setLastCookedDate(parsed.lastCookedDate);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  const handleSave = () => {
    try {
      const data = {
        noteText,
        rating,
        lastCookedDate,
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      setSavedSuccess(true);
    }
  };

  const handleMarkCookedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setLastCookedDate(today);
    try {
      const data = {
        noteText,
        rating,
        lastCookedDate: today,
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      setSavedSuccess(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-neutral-900">
              Catatan Dapur Pribadi
            </h3>
            <p className="text-xs text-neutral-600 font-medium">
              Catatan privat bumbu atau modifikasi untuk selera keluarga Anda.
            </p>
          </div>
        </div>

        {/* Personal Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-0.5 hover:scale-125 transition-transform"
              title={`Beri nilai ${star} bintang`}
            >
              <Star
                className={`w-4 h-4 ${
                  star <= rating
                    ? "fill-amber-400 text-amber-500"
                    : "text-neutral-300 hover:text-amber-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <textarea
          rows={3}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Tulis tweak Anda (contoh: Kurangi cabai jadi 6 siung untuk anak-anak, tambah kecap sedikit)..."
          className="w-full px-4 py-3 rounded-2xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 text-sm font-medium text-neutral-900 bg-white placeholder:text-neutral-500"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleMarkCookedToday}
              className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-bold text-neutral-800 border border-neutral-300 flex items-center gap-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              <span>Saya Masak Ini Hari Ini!</span>
            </button>

            {lastCookedDate && (
              <span className="text-neutral-600 font-medium">
                Terakhir dimasak: <strong className="text-neutral-900">{lastCookedDate}</strong>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleSave}
            className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
              savedSuccess
                ? "bg-emerald-600 text-white"
                : "bg-neutral-950 hover:bg-orange-600 text-white"
            }`}
          >
            {savedSuccess ? <Check className="w-4 h-4 stroke-[3]" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? "Catatan Tersimpan!" : "Simpan Catatan"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
