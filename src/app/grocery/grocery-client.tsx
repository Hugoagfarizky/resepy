"use client";

import { useState, useEffect } from "react";
import { GroceryItem, UnitType } from "@/types/recipe";
import { groupGroceryByCategory } from "@/lib/grocery/aggregator";
import { formatQuantity, getUnitDisplayLabel } from "@/lib/units/format";
import {
  ShoppingCart,
  Check,
  Plus,
  Trash2,
  Copy,
  CheckCheck,
  Sparkles,
  Layers,
} from "lucide-react";

export function GroceryClient() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Manual quick add form
  const [manualName, setManualName] = useState("");
  const [manualQty, setManualQty] = useState("1");
  const [manualUnit, setManualUnit] = useState<UnitType>("BUTIR");
  const [manualCategory, setManualCategory] = useState("Bahan Pokok");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("luminaire_grocery_items");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  const saveItems = (updated: GroceryItem[]) => {
    setItems(updated);
    try {
      localStorage.setItem("luminaire_grocery_items", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleCheck = (id: string) => {
    saveItems(
      items.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  const handleClearChecked = () => {
    saveItems(items.filter((item) => !item.isChecked));
  };

  const handleClearAll = () => {
    if (confirm("Kosongkan seluruh daftar belanja?")) {
      saveItems([]);
    }
  };

  const handleAddManualItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim()) return;

    const newItem: GroceryItem = {
      id: `grocery_manual_${Date.now()}`,
      ingredientId: `ing_man_${Date.now()}`,
      name: manualName.trim(),
      totalQuantity: parseFloat(manualQty) || 1,
      unit: manualUnit,
      category: manualCategory,
      isChecked: false,
      sources: ["Ditambahkan manual"],
    };

    saveItems([...items, newItem]);
    setManualName("");
    setManualQty("1");
  };

  const handleCopyText = () => {
    const grouped = groupGroceryByCategory(items);
    let text = "🛒 DAFTAR BELANJA RESEPY:\n\n";

    Object.entries(grouped).forEach(([cat, catItems]) => {
      text += `📍 ${cat.toUpperCase()}:\n`;
      catItems.forEach((i) => {
        const checkMark = i.isChecked ? "✓" : "•";
        text += `${checkMark} ${i.name} - ${formatQuantity(i.totalQuantity)} ${getUnitDisplayLabel(i.unit)}\n`;
      });
      text += "\n";
    });

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  if (!isLoaded) return null;

  const grouped = groupGroceryByCategory(items);
  const checkedCount = items.filter((i) => i.isChecked).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-wider mb-1">
            <ShoppingCart className="w-4 h-4 text-orange-600" />
            <span>Smart Shopping Assistant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            Daftar Belanja Cerdas
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 mt-1 font-normal">
            Bahan dari seluruh resep otomatis digabungkan dan dikelompokkan berdasarkan lorong pasar
            atau supermarket.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-black text-neutral-900 transition-colors shadow-xs"
            >
              {copiedSuccess ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4 text-neutral-600" />}
              <span>{copiedSuccess ? "Disalin ke Clipboard!" : "Salin Format Teks"}</span>
            </button>

            {checkedCount > 0 && (
              <button
                type="button"
                onClick={handleClearChecked}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-100 text-orange-950 border border-orange-300 hover:bg-orange-200 text-xs font-black transition-colors"
              >
                <CheckCheck className="w-4 h-4 text-orange-700" />
                <span>Hapus Selesai ({checkedCount})</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleClearAll}
              className="p-2.5 rounded-xl text-neutral-500 hover:text-rose-600 hover:bg-neutral-100 transition-colors"
              title="Kosongkan Semua"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Category Grouped Checklist (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {items.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-neutral-200 space-y-3 shadow-xs">
              <ShoppingCart className="w-12 h-12 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-black text-neutral-900">Daftar Belanja Masih Kosong</h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto font-medium">
                Buka salah satu resep dan klik &ldquo;+ Tambahkan ke Daftar Belanja&rdquo; atau ekspor dari
                Meal Planner mingguan Anda!
              </p>
            </div>
          ) : (
            Object.entries(grouped).map(([category, catItems]) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-900">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Lorong: {category}</span>
                  <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                    {catItems.length} item
                  </span>
                </div>

                <ul className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200/90 bg-white shadow-xs overflow-hidden">
                  {catItems.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`flex items-start gap-3.5 p-4 cursor-pointer transition-colors hover:bg-neutral-50 ${
                        item.isChecked ? "bg-neutral-50" : ""
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          item.isChecked
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-neutral-400 bg-white"
                        }`}
                      >
                        {item.isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1 text-sm select-none">
                        <div className="flex items-baseline justify-between gap-2">
                          <span
                            className={`font-bold ${
                              item.isChecked ? "text-neutral-400 line-through" : "text-neutral-900"
                            }`}
                          >
                            {item.name}
                          </span>

                          <span
                            className={`font-mono text-sm shrink-0 ${
                              item.isChecked ? "text-neutral-400" : "text-orange-700 font-black"
                            }`}
                          >
                            {formatQuantity(item.totalQuantity)} {getUnitDisplayLabel(item.unit)}
                          </span>
                        </div>

                        {item.sources && item.sources.length > 0 && (
                          <p className="text-xs text-neutral-600 font-medium mt-1">
                            Dibutuhkan untuk: {item.sources.join(", ")}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Right Side: Quick Manual Add (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <form
            onSubmit={handleAddManualItem}
            className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4"
          >
            <h3 className="text-base font-extrabold text-neutral-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-orange-600" />
              <span>Tambah Item Belanja Ekstra</span>
            </h3>

            <div className="space-y-3.5">
              <input
                type="text"
                placeholder="Nama barang (misal: Minyak Goreng, Tisu)"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-semibold text-neutral-900 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white placeholder:text-neutral-500"
                required
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="any"
                  min="0.1"
                  placeholder="Qty"
                  value={manualQty}
                  onChange={(e) => setManualQty(e.target.value)}
                  className="px-3 py-2 text-sm font-bold text-neutral-900 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white"
                  required
                />
                <select
                  value={manualUnit}
                  onChange={(e) => setManualUnit(e.target.value as UnitType)}
                  className="px-2.5 py-2 text-xs font-bold text-neutral-900 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white"
                >
                  <option value="BUTIR">Butir</option>
                  <option value="GRAM">Gram (g)</option>
                  <option value="KILOGRAM">Kilogram (kg)</option>
                  <option value="MILLILITER">ml</option>
                  <option value="LITER">Liter</option>
                  <option value="IKAT">Ikat</option>
                  <option value="POTONG">Potong</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 mb-1">
                  Kategori Lorong
                </label>
                <select
                  value={manualCategory}
                  onChange={(e) => setManualCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold text-neutral-900 rounded-xl border border-neutral-300 focus:outline-hidden focus:border-orange-500 bg-white"
                >
                  <option value="Bumbu & Rempah">Bumbu & Rempah</option>
                  <option value="Sayuran">Sayuran Segar</option>
                  <option value="Daging & Unggas">Daging & Unggas</option>
                  <option value="Bahan Pokok">Bahan Pokok & Sembako</option>
                  <option value="Dairy & Telur">Dairy & Telur</option>
                  <option value="Kebutuhan Dapur">Kebutuhan Dapur & Lainnya</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Tambah ke Belanjaan</span>
              </button>
            </div>
          </form>

          {/* Quick Tips */}
          <div className="p-5 rounded-2xl bg-neutral-100/70 border border-neutral-200 text-xs text-neutral-700 space-y-2">
            <h4 className="font-extrabold text-neutral-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Tips Belanja Hemat:</span>
            </h4>
            <p className="leading-relaxed font-normal">
              Centang bahan saat Anda meletakkannya di keranjang belanja. Item yang sudah dicentang
              bisa dihapus sekaligus dengan tombol &ldquo;Hapus Selesai&rdquo;.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
