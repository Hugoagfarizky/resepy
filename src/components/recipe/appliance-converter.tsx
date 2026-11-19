"use client";

import { useState } from "react";
import { getApplianceData, ApplianceInstruction, ApplianceType } from "@/data/appliance-conversions";
import { Flame, Wind, Utensils, Clock, CheckCircle2, Lightbulb, Sparkles } from "lucide-react";

interface ApplianceConverterProps {
  recipeSlug: string;
}

export function ApplianceConverter({ recipeSlug }: ApplianceConverterProps) {
  const appliances = getApplianceData(recipeSlug);
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceType>(appliances[0].appliance);

  const current = appliances.find((a) => a.appliance === selectedAppliance) || appliances[0];

  const getIcon = (type: ApplianceType) => {
    switch (type) {
      case "AIR_FRYER":
        return <Wind className="w-4 h-4" />;
      case "OVEN":
        return <Utensils className="w-4 h-4" />;
      case "PRESSURE_COOKER":
        return <Clock className="w-4 h-4" />;
      case "STOVE":
      default:
        return <Flame className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 text-orange-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-base font-black text-neutral-900">
              Konverter Alat Dapur (Multi-Appliance)
            </h3>
            <p className="text-xs text-neutral-600 font-medium">
              Sesuaikan suhu dan waktu memasak dengan peralatan yang ada di rumah Anda.
            </p>
          </div>
        </div>
      </div>

      {/* Appliance Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {appliances.map((app) => {
          const isActive = app.appliance === selectedAppliance;
          return (
            <button
              key={app.appliance}
              type="button"
              onClick={() => setSelectedAppliance(app.appliance)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all ${
                isActive
                  ? "bg-orange-600 text-white shadow-xs scale-102"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
              }`}
            >
              {getIcon(app.appliance)}
              <span>{app.label}</span>
            </button>
          );
        })}
      </div>

      {/* Conversion Details Card */}
      <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-3.5 animate-fade-in">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {current.recommendedTemp && (
            <div className="p-3 bg-white rounded-xl border border-orange-200/90 shadow-2xs">
              <span className="text-[10px] uppercase font-black text-orange-900 block mb-0.5">
                Rekomendasi Suhu:
              </span>
              <span className="text-sm font-black text-orange-700">{current.recommendedTemp}</span>
            </div>
          )}

          <div className="p-3 bg-white rounded-xl border border-orange-200/90 shadow-2xs">
            <span className="text-[10px] uppercase font-black text-orange-900 block mb-0.5">
              Estimasi Durasi Masak:
            </span>
            <span className="text-sm font-black text-neutral-900">{current.recommendedTime}</span>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-neutral-800">
          <span className="font-black text-neutral-900 flex items-center gap-1.5 uppercase tracking-wide">
            <CheckCircle2 className="w-4 h-4 text-orange-600" />
            Panduan Cara Memasak dengan {current.label}:
          </span>
          <p className="leading-relaxed font-medium pl-5">{current.instruction}</p>
        </div>

        {current.proTip && (
          <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <strong className="font-black text-amber-900">Tips Khusus:</strong> {current.proTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
