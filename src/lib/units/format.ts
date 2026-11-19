/**
 * Memformat angka kuantitas menjadi representasi pecahan yang rapi dan mudah dibaca di dapur.
 * Contoh:
 * 1.5 -> "1 ½"
 * 0.25 -> "¼"
 * 0.33 -> "⅓"
 * 2 -> "2"
 */
export function formatQuantity(qty: number): string {
  if (qty <= 0) return "";
  
  // Bulatkan toleransi floating point kecil
  const rounded = Math.round(qty * 100) / 100;
  const whole = Math.floor(rounded);
  const frac = Math.round((rounded - whole) * 100) / 100;

  let fracStr = "";
  if (Math.abs(frac - 0.25) < 0.05) fracStr = "¼";
  else if (Math.abs(frac - 0.33) < 0.05) fracStr = "⅓";
  else if (Math.abs(frac - 0.5) < 0.05) fracStr = "½";
  else if (Math.abs(frac - 0.66) < 0.05) fracStr = "⅔";
  else if (Math.abs(frac - 0.75) < 0.05) fracStr = "¾";
  else if (frac > 0) {
    fracStr = frac.toString().replace(/^0/, "");
  }

  if (whole === 0) {
    return fracStr || "0";
  }
  return fracStr ? `${whole} ${fracStr}` : `${whole}`;
}

/**
 * Menghasilkan label satuan yang ramah pengguna (bahasa Indonesia / simbol baku)
 */
export function getUnitDisplayLabel(unit: string, qty: number = 1): string {
  switch (unit) {
    case "GRAM":
      return "g";
    case "KILOGRAM":
      return "kg";
    case "MILLILITER":
      return "ml";
    case "LITER":
      return "L";
    case "TABLESPOON":
      return "sdm";
    case "TEASPOON":
      return "sdt";
    case "CUP":
      return "cup";
    case "OUNCE":
      return "oz";
    case "POUND":
      return "lb";
    case "RUAS":
      return "ruas";
    case "SIUNG":
      return "siung";
    case "BUTIR":
      return "butir";
    case "LEMBAR":
      return "lembar";
    case "IKAT":
      return "ikat";
    case "BATANG":
      return "batang";
    case "POTONG":
      return "potong";
    case "SEJUMPUT":
      return "sejumput";
    case "SECUKUPNYA":
      return "secukupnya";
    default:
      return unit.toLowerCase();
  }
}
