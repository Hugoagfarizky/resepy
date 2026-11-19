export interface SubstitutionOption {
  name: string;
  ratio: string;
  tasteNote: string;
}

export interface IngredientSubstitution {
  targetKeywords: string[]; // Keywords to match ingredient name
  substitutes: SubstitutionOption[];
}

export const COMMON_SUBSTITUTIONS: IngredientSubstitution[] = [
  {
    targetKeywords: ["asam kandis"],
    substitutes: [
      {
        name: "Asam Jawa + Sedikit Jeruk Nipis",
        ratio: "1 potong asam kandis ≈ ½ sdt asam jawa larut",
        tasteNote: "Memberikan rasa asam segar yang mirip tanpa merusak kepekatan kuah rendang/gulai.",
      },
      {
        name: "Belimbing Wuluh Kering",
        ratio: "1:1",
        tasteNote: "Asam pekat alami yang tidak merubah aroma rempah.",
      },
    ],
  },
  {
    targetKeywords: ["santan kental", "santan"],
    substitutes: [
      {
        name: "Susu Evaporasi Tanpa Gula",
        ratio: "1:1",
        tasteNote: "Menghasilkan kuah creamy gurih dengan lemak jenuh yang jauh lebih rendah.",
      },
      {
        name: "Santan Bubuk Instan + Air Hangat",
        ratio: "3 sdm santan bubuk per 150ml air",
        tasteNote: "Praktis jika tidak memiliki kelapa parut segar di kulkas.",
      },
      {
        name: "Cooking Cream / Heavy Cream",
        ratio: "1:1",
        tasteNote: "Cocok untuk masakan kari fusi agar lebih kental dan lembut.",
      },
    ],
  },
  {
    targetKeywords: ["kemiri"],
    substitutes: [
      {
        name: "Kacang Mede / Macadamia",
        ratio: "1 butir kemiri ≈ 1 butir kacang mede mentah",
        tasteNote: "Memberikan kekentalan emulsi bumbu yang sangat gurih dan creamy.",
      },
      {
        name: "Almond Kupas Sangrai",
        ratio: "1 butir kemiri ≈ 2 butir almond",
        tasteNote: "Alternatif bebas kemiri dengan profil rasa kacang lembut.",
      },
    ],
  },
  {
    targetKeywords: ["telur"],
    substitutes: [
      {
        name: "Tepung Maizena + Air (Bahan Perekat Katsu)",
        ratio: "1 butir telur ≈ 2 sdm maizena + 2 sdm air",
        tasteNote: "Cocok untuk pencelup tepung katsu jika memiliki alergi telur.",
      },
      {
        name: "Aquafaba (Air Rendaman Buncis/Chickpea)",
        ratio: "1 butir telur ≈ 3 sdm aquafaba",
        tasteNote: "Pengganti telur vegan 100% tanpa rasa amis.",
      },
    ],
  },
  {
    targetKeywords: ["panko", "tepung roti"],
    substitutes: [
      {
        name: "Roti Tawar Kering Diblender Kasar",
        ratio: "1:1",
        tasteNote: "Roti tawar dianginkan atau dipanggang sebentar lalu diremas kasar.",
      },
      {
        name: "Cracker Asin / Biskuit Asin Remuk",
        ratio: "1:1",
        tasteNote: "Memberikan lapisan ekstra renyah dan gurih pada gorengan.",
      },
    ],
  },
  {
    targetKeywords: ["terasi", "terasi bakar"],
    substitutes: [
      {
        name: "Kecap Ikan + Garam",
        ratio: "1 sdt terasi ≈ 1 sdt kecap ikan berkualitas",
        tasteNote: "Memberikan umami fermentasi laut yang dalam tanpa aroma tajam terasi.",
      },
      {
        name: "Pasta Miso Jepang (Versi Vegetarian)",
        ratio: "1 sdt terasi ≈ 1 sdt red miso",
        tasteNote: "Solusi umami nabati bagi yang menghindari seafood/udang.",
      },
    ],
  },
  {
    targetKeywords: ["kencur"],
    substitutes: [
      {
        name: "Jahe Muda + Sedikit Parutan Kulit Jeruk Purut",
        ratio: "1 ruas kencur ≈ ½ ruas jahe muda + sejumput kulit jeruk",
        tasteNote: "Mendekati karakter aroma segar hangat khas kencur.",
      },
    ],
  },
  {
    targetKeywords: ["daun kunyit"],
    substitutes: [
      {
        name: "Daun Salam + Sedikit Kunyit Bubuk",
        ratio: "1 lembar daun kunyit ≈ 2 lembar daun salam",
        tasteNote: "Cukup membantu memberikan aroma rempah aromatik jika sulit menemukan daun kunyit.",
      },
    ],
  },
];

/**
 * Mencari saran bahan pengganti berdasarkan nama bahan
 */
export function findSubstitutions(ingredientName: string): SubstitutionOption[] | null {
  const lower = ingredientName.toLowerCase().trim();
  for (const item of COMMON_SUBSTITUTIONS) {
    if (item.targetKeywords.some((kw) => lower.includes(kw))) {
      return item.substitutes;
    }
  }
  return null;
}
