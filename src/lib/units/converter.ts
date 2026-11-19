import { UnitType } from "@/types/recipe";

/**
 * Konversi perkiraan massa (gram) untuk satuan umum & lokal
 */
const UNIT_TO_GRAM_APPROX: Record<string, number> = {
  GRAM: 1,
  KILOGRAM: 1000,
  MILLILITER: 1, // default asumsi densitas air 1g/ml
  LITER: 1000,
  TABLESPOON: 15,
  TEASPOON: 5,
  CUP: 240,
  OUNCE: 28.35,
  POUND: 453.59,
  SIUNG: 5,       // 1 siung bawang putih/merah ~5g
  RUAS: 10,       // 1 ruas jahe/kunyit ~10g
  BUTIR: 50,      // perkiraan umum (misal telur ~50g, kemiri ~5-7g)
  LEMBAR: 1,      // daun salam/jeruk ~1g
  BATANG: 15,     // serai/daun bawang ~15g
  IKAT: 200,      // sayuran ikat ~200g
  POTONG: 100,    // potongan daging/tahu ~100g
  SEJUMPUT: 0.5,
  SECUKUPNYA: 0,
};

/**
 * Menghitung kuantitas bahan yang diskalakan berdasarkan porsi target
 */
export function scaleQuantity(
  originalQty: number,
  baseServings: number,
  targetServings: number
): number {
  if (baseServings <= 0 || targetServings <= 0 || originalQty <= 0) {
    return originalQty;
  }
  const ratio = targetServings / baseServings;
  const scaled = originalQty * ratio;
  // Bulatkan ke 2 desimal
  return Math.round(scaled * 100) / 100;
}

/**
 * Mengonversi kuantitas bahan ke gram perkiraan (digunakan untuk kalkulasi nutrisi)
 */
export function convertToEstimatedGrams(
  quantity: number,
  unit: UnitType,
  densityGPerMl: number = 1.0
): number {
  if (unit === "SECUKUPNYA" || quantity <= 0) return 0;

  // Jika volume (ml, liter, cup, sdm, sdt) terapkan densitas bahan jika ada
  if (unit === "MILLILITER") return quantity * densityGPerMl;
  if (unit === "LITER") return quantity * 1000 * densityGPerMl;
  if (unit === "TABLESPOON") return quantity * 15 * densityGPerMl;
  if (unit === "TEASPOON") return quantity * 5 * densityGPerMl;
  if (unit === "CUP") return quantity * 240 * densityGPerMl;

  const factor = UNIT_TO_GRAM_APPROX[unit] ?? 1;
  return quantity * factor;
}
