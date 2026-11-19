"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DietType, Difficulty, UnitType, RecipeFull } from "@/types/recipe";
import { MOCK_RECIPES } from "@/data/mock-recipes";
import {
  ChefHat,
  Plus,
  Trash2,
  Clock,
  Timer,
  CheckCircle2,
  Sparkles,
  Layers,
} from "lucide-react";

interface ComponentDraft {
  id: string;
  title: string;
  ingredients: {
    id: string;
    name: string;
    quantity: number;
    unit: UnitType;
    preparation: string;
    category: string;
  }[];
}

interface StepDraft {
  id: string;
  stepNumber: number;
  instruction: string;
  timerMinutes: number;
  timerLabel: string;
  chefTip: string;
}

export function StudioClient() {
  const router = useRouter();

  // Basic Info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
  );
  const [authorName, setAuthorName] = useState("Chef Pengguna");
  const [defaultServings, setDefaultServings] = useState(4);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(15);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(30);
  const [difficulty, setDifficulty] = useState<Difficulty>("MEDIUM");
  const [originRegion, setOriginRegion] = useState("Nusantara, Indonesia");
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>(["HALAL"]);

  // Multi-component Groups
  const [components, setComponents] = useState<ComponentDraft[]>([
    {
      id: "comp_1",
      title: "Bahan Utama",
      ingredients: [
        {
          id: "ing_1",
          name: "",
          quantity: 250,
          unit: "GRAM",
          preparation: "",
          category: "Bahan Pokok",
        },
      ],
    },
  ]);

  // Steps
  const [steps, setSteps] = useState<StepDraft[]>([
    {
      id: "step_1",
      stepNumber: 1,
      instruction: "",
      timerMinutes: 0,
      timerLabel: "",
      chefTip: "",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Component Helpers
  const addComponent = () => {
    setComponents([
      ...components,
      {
        id: `comp_${Date.now()}`,
        title: `Komponen ${components.length + 1}`,
        ingredients: [
          {
            id: `ing_${Date.now()}`,
            name: "",
            quantity: 1,
            unit: "BUTIR",
            preparation: "",
            category: "Bahan Pokok",
          },
        ],
      },
    ]);
  };

  const removeComponent = (compId: string) => {
    if (components.length <= 1) return;
    setComponents(components.filter((c) => c.id !== compId));
  };

  const addIngredientToComponent = (compId: string) => {
    setComponents(
      components.map((c) => {
        if (c.id === compId) {
          return {
            ...c,
            ingredients: [
              ...c.ingredients,
              {
                id: `ing_${Date.now()}_${Math.random()}`,
                name: "",
                quantity: 1,
                unit: "SIUNG",
                preparation: "",
                category: "Bumbu & Rempah",
              },
            ],
          };
        }
        return c;
      })
    );
  };

  const removeIngredient = (compId: string, ingId: string) => {
    setComponents(
      components.map((c) => {
        if (c.id === compId) {
          return {
            ...c,
            ingredients: c.ingredients.filter((i) => i.id !== ingId),
          };
        }
        return c;
      })
    );
  };

  // Steps Helpers
  const addStep = () => {
    setSteps([
      ...steps,
      {
        id: `step_${Date.now()}`,
        stepNumber: steps.length + 1,
        instruction: "",
        timerMinutes: 0,
        timerLabel: "",
        chefTip: "",
      },
    ]);
  };

  const removeStep = (stepId: string) => {
    if (steps.length <= 1) return;
    const filtered = steps.filter((s) => s.id !== stepId);
    setSteps(filtered.map((s, idx) => ({ ...s, stepNumber: idx + 1 })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Silakan masukkan judul resep.");
      return;
    }

    setIsSubmitting(true);
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const newRecipe: RecipeFull = {
      id: `rec_${Date.now()}`,
      title,
      slug,
      description,
      coverImage,
      authorName,
      defaultServings,
      prepTimeMinutes,
      cookTimeMinutes,
      difficulty,
      dietaryTags: selectedDiets,
      originRegion,
      rating: 5.0,
      ratingCount: 1,
      components: components.map((c, idx) => ({
        id: c.id,
        title: c.title,
        orderIndex: idx,
        ingredients: c.ingredients.map((ing) => ({
          id: ing.id,
          ingredientId: ing.id,
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
          preparation: ing.preparation || undefined,
          category: ing.category,
        })),
      })),
      steps: steps.map((s) => ({
        id: s.id,
        stepNumber: s.stepNumber,
        instruction: s.instruction,
        timerSeconds: s.timerMinutes > 0 ? s.timerMinutes * 60 : undefined,
        timerLabel: s.timerLabel || undefined,
        chefTip: s.chefTip || undefined,
      })),
    };

    // Push into MOCK_RECIPES array for immediate local viewing
    MOCK_RECIPES.unshift(newRecipe);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/recipes/${slug}`);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
          <ChefHat className="w-4 h-4" />
          <span>Creator Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          Tulis Resep Baru (Multi-Komponen)
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Rancang resep kompleks dengan pembagian komponen (bumbu, marinasi, kuah), timer di tiap
          tahapan, serta estimasi nutrisi otomatis.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section 1: Informasi Dasar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
          <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span>Informasi Pokok Resep</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Judul Resep <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Soto Betawi Kuah Susu Daging Empuk"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 text-base font-bold text-neutral-900 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Deskripsi Singkat & Cerita Rasa
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan keistimewaan rasa, tekstur, atau sejarah resep ini..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 text-sm text-neutral-800 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  URL Foto Sampul (Unsplash / WebP)
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 text-xs font-mono bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Asal Daerah / Wilayah
                </label>
                <input
                  type="text"
                  placeholder="Misal: Jawa Tengah, Indonesia"
                  value={originRegion}
                  onChange={(e) => setOriginRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 text-xs bg-white"
                />
              </div>
            </div>

            {/* Quick Stats: Servings, Prep, Cook Time, Difficulty */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Porsi Dasar</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={defaultServings}
                  onChange={(e) => setDefaultServings(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm font-bold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Prep (Menit)</label>
                <input
                  type="number"
                  min="0"
                  value={prepTimeMinutes}
                  onChange={(e) => setPrepTimeMinutes(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm font-bold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Masak (Menit)</label>
                <input
                  type="number"
                  min="0"
                  value={cookTimeMinutes}
                  onChange={(e) => setCookTimeMinutes(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-sm font-bold bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Tingkat Kesulitan</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold bg-white"
                >
                  <option value="EASY">Mudah (Easy)</option>
                  <option value="MEDIUM">Sedang (Medium)</option>
                  <option value="HARD">Sulit (Hard)</option>
                  <option value="EXPERT">Pakar (Expert)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Multi-Component Ingredients */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-600" />
                <span>Bahan & Komponen Resep</span>
              </h2>
              <p className="text-xs text-neutral-500">
                Bagi bahan menjadi sub-komponen (contoh: &ldquo;Bahan Marinasi&rdquo;, &ldquo;Bumbu Halus&rdquo;,
                &ldquo;Pelengkap&rdquo;).
              </p>
            </div>

            <button
              type="button"
              onClick={addComponent}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Komponen</span>
            </button>
          </div>

          <div className="space-y-6">
            {components.map((comp) => (
              <div
                key={comp.id}
                className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    value={comp.title}
                    onChange={(e) =>
                      setComponents(
                        components.map((c) => (c.id === comp.id ? { ...c, title: e.target.value } : c))
                      )
                    }
                    placeholder="Nama Komponen (misal: Bumbu Halus)"
                    className="px-3.5 py-1.5 text-sm font-extrabold rounded-xl border border-neutral-300 bg-white focus:outline-hidden focus:border-orange-500"
                  />

                  {components.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeComponent(comp.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1.5"
                      title="Hapus Komponen Ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Ingredients inside this component */}
                <div className="space-y-2">
                  {comp.ingredients.map((ing) => (
                    <div
                      key={ing.id}
                      className="grid grid-cols-12 gap-2 items-center bg-white p-2.5 rounded-xl border border-neutral-200"
                    >
                      <input
                        type="text"
                        placeholder="Nama Bahan (misal: Bawang Merah)"
                        value={ing.name}
                        onChange={(e) =>
                          setComponents(
                            components.map((c) =>
                              c.id === comp.id
                                ? {
                                    ...c,
                                    ingredients: c.ingredients.map((i) =>
                                      i.id === ing.id ? { ...i, name: e.target.value } : i
                                    ),
                                  }
                                : c
                            )
                          )
                        }
                        className="col-span-5 px-2.5 py-1.5 text-xs rounded-lg border border-neutral-200 font-semibold"
                        required
                      />

                      <input
                        type="number"
                        step="any"
                        placeholder="Kuantitas"
                        value={ing.quantity}
                        onChange={(e) =>
                          setComponents(
                            components.map((c) =>
                              c.id === comp.id
                                ? {
                                    ...c,
                                    ingredients: c.ingredients.map((i) =>
                                      i.id === ing.id
                                        ? { ...i, quantity: parseFloat(e.target.value) || 0 }
                                        : i
                                    ),
                                  }
                                : c
                            )
                          )
                        }
                        className="col-span-2 px-2 py-1.5 text-xs rounded-lg border border-neutral-200 font-mono text-center"
                        required
                      />

                      <select
                        value={ing.unit}
                        onChange={(e) =>
                          setComponents(
                            components.map((c) =>
                              c.id === comp.id
                                ? {
                                    ...c,
                                    ingredients: c.ingredients.map((i) =>
                                      i.id === ing.id ? { ...i, unit: e.target.value as UnitType } : i
                                    ),
                                  }
                                : c
                            )
                          )
                        }
                        className="col-span-2 px-1 py-1.5 text-xs rounded-lg border border-neutral-200 font-medium"
                      >
                        <option value="GRAM">Gram</option>
                        <option value="KILOGRAM">Kilogram</option>
                        <option value="MILLILITER">ml</option>
                        <option value="LITER">Liter</option>
                        <option value="TABLESPOON">sdm</option>
                        <option value="TEASPOON">sdt</option>
                        <option value="CUP">Cup</option>
                        <option value="SIUNG">Siung</option>
                        <option value="RUAS">Ruas</option>
                        <option value="BUTIR">Butir</option>
                        <option value="LEMBAR">Lembar</option>
                        <option value="BATANG">Batang</option>
                        <option value="IKAT">Ikat</option>
                        <option value="POTONG">Potong</option>
                        <option value="SECUKUPNYA">Secukupnya</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Catatan (misal: cincang)"
                        value={ing.preparation}
                        onChange={(e) =>
                          setComponents(
                            components.map((c) =>
                              c.id === comp.id
                                ? {
                                    ...c,
                                    ingredients: c.ingredients.map((i) =>
                                      i.id === ing.id ? { ...i, preparation: e.target.value } : i
                                    ),
                                  }
                                : c
                            )
                          )
                        }
                        className="col-span-2 px-2 py-1.5 text-xs rounded-lg border border-neutral-200"
                      />

                      <button
                        type="button"
                        onClick={() => removeIngredient(comp.id, ing.id)}
                        className="col-span-1 text-neutral-400 hover:text-rose-600 flex justify-center"
                        title="Hapus Bahan"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addIngredientToComponent(comp.id)}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 pt-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Baris Bahan ke {comp.title}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Step-by-Step Instructions with Timers */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-neutral-900 flex items-center gap-2">
                <Timer className="w-5 h-5 text-orange-600" />
                <span>Instruksi Memasak & Timer Interaktif</span>
              </h2>
              <p className="text-xs text-neutral-500">
                Tentukan durasi timer di langkah yang memerlukan waktu agar pengguna bisa memicu
                timer suara di dapur.
              </p>
            </div>

            <button
              type="button"
              onClick={addStep}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Langkah</span>
            </button>
          </div>

          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/90 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-700">
                    Langkah {idx + 1}
                  </span>

                  {steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(step.id)}
                      className="text-neutral-400 hover:text-rose-600 p-1"
                      title="Hapus Langkah"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <textarea
                  rows={2}
                  placeholder={`Instruksi detail untuk langkah ${idx + 1}...`}
                  value={step.instruction}
                  onChange={(e) =>
                    setSteps(
                      steps.map((s) => (s.id === step.id ? { ...s, instruction: e.target.value } : s))
                    )
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-neutral-300 bg-white focus:outline-hidden focus:border-orange-500"
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                    <input
                      type="number"
                      min="0"
                      placeholder="Timer (menit)"
                      value={step.timerMinutes || ""}
                      onChange={(e) =>
                        setSteps(
                          steps.map((s) =>
                            s.id === step.id
                              ? { ...s, timerMinutes: parseInt(e.target.value, 10) || 0 }
                              : s
                          )
                        )
                      }
                      className="w-28 px-3 py-1.5 text-xs rounded-xl border border-neutral-300 bg-white"
                    />
                    <input
                      type="text"
                      placeholder="Label timer (misal: Rebus kuah)"
                      value={step.timerLabel}
                      onChange={(e) =>
                        setSteps(
                          steps.map((s) =>
                            s.id === step.id ? { ...s, timerLabel: e.target.value } : s
                          )
                        )
                      }
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-neutral-300 bg-white"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Tips Koki / Secret Tip (opsional)"
                    value={step.chefTip}
                    onChange={(e) =>
                      setSteps(
                        steps.map((s) => (s.id === step.id ? { ...s, chefTip: e.target.value } : s))
                      )
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-neutral-300 bg-white italic"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Publish Recipe */}
        <div className="text-right pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-neutral-900 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isSubmitting ? "Menerbitkan Resep..." : "Terbitkan Resep ke Platform"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
