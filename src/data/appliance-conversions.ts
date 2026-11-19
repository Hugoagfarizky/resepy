export type ApplianceType = "STOVE" | "AIR_FRYER" | "OVEN" | "PRESSURE_COOKER";

export interface ApplianceInstruction {
  appliance: ApplianceType;
  label: string;
  iconName: string;
  recommendedTemp?: string;
  recommendedTime: string;
  instruction: string;
  proTip: string;
}

export const RECIPE_APPLIANCE_DATA: Record<string, ApplianceInstruction[]> = {
  "japanese-chicken-katsu-curry": [
    {
      appliance: "STOVE",
      label: "Wajan / Kompor (Asli)",
      iconName: "Flame",
      recommendedTemp: "170°C (Minyak sedang)",
      recommendedTime: "4 - 5 menit per sisi",
      instruction:
        "Goreng dalam minyak panas cukup hingga terendam setengah (shallow fry). Balik sekali saat bagian bawah keemasan.",
      proTip: "Gunakan api sedang stabil agar tepung panko tidak cepat hitam sebelum daging ayam matang.",
    },
    {
      appliance: "AIR_FRYER",
      label: "Air Fryer (Hemat Minyak)",
      iconName: "Wind",
      recommendedTemp: "185°C",
      recommendedTime: "12 - 14 menit",
      instruction:
        "Semprotkan atau olesi sedikit minyak goreng pada permukaan tepung panko katsu. Masukkan ke keranjang air fryer tanpa bertumpuk. Balik di menit ke-7.",
      proTip: "Mengoleskan tipis minyak sangat penting agar tepung panko tetap keemasan renyah dan tidak pucat.",
    },
    {
      appliance: "OVEN",
      label: "Oven Panggang",
      iconName: "Utensils",
      recommendedTemp: "200°C (Preheat)",
      recommendedTime: "18 - 20 menit",
      instruction:
        "Letakkan katsu di atas rak kawat pemanggang (wire rack) dengan loyang di bawahnya agar udara panas bersirkulasi di bawah daging. Balik di menit ke-10.",
      proTip: "Menggunakan rak kawat mencegah bagian bawah katsu menjadi basah berkeringat.",
    },
  ],
  "ayam-bakar-taliwang-khas-lombok": [
    {
      appliance: "STOVE",
      label: "Grill Pan / Kompor (Asli)",
      iconName: "Flame",
      recommendedTemp: "Api Sedang",
      recommendedTime: "15 - 20 menit bolak-balik",
      instruction:
        "Panggang di atas grill pan atau wajan datar dengan sedikit minyak. Olesi bumbu taliwang berulang kali hingga terkaramelisasi.",
      proTip: "Tutup wajan sebentar di awal agar panas uap mematangkan bagian dalam daging ayam kampung.",
    },
    {
      appliance: "AIR_FRYER",
      label: "Air Fryer",
      iconName: "Wind",
      recommendedTemp: "180°C",
      recommendedTime: "16 - 18 menit",
      instruction:
        "Panggang ayam selama 10 menit pertama. Buka keranjang, lumuri bumbu olesan taliwang secara tebal di kedua sisi, lalu lanjutkan memanggang 6-8 menit hingga wangi bakaran keluar.",
      proTip: "Jangan mengoles bumbu manis di awal agar tidak gosong sebelum ayam matang.",
    },
    {
      appliance: "OVEN",
      label: "Oven Panggang",
      iconName: "Utensils",
      recommendedTemp: "200°C",
      recommendedTime: "25 - 30 menit",
      instruction:
        "Panggang dengan loyang dialasi aluminium foil. Olesi bumbu di 10 menit terakhir dengan mode grill/api atas.",
      proTip: "Nyalakan api atas di akhir untuk menghasilkan aroma 'charred' khas arang.",
    },
  ],
  "rendang-daging-sapi-otentik": [
    {
      appliance: "STOVE",
      label: "Wajan Tradisional (Asli)",
      iconName: "Flame",
      recommendedTemp: "Api Sangat Kecil (Simmer)",
      recommendedTime: "3.5 - 4 jam",
      instruction:
        "Masak perlahan dari gulai -> kalio -> rendang gelap kering dengan mengaduk berkala agar bawah wajan tidak berkerak gosong.",
      proTip: "Kunci rendang Minang otentik adalah minyak kelapa yang terbit alami dan mematangkan bumbu perlahan.",
    },
    {
      appliance: "PRESSURE_COOKER",
      label: "Panci Presto (Kilat 1 Jam)",
      iconName: "Clock",
      recommendedTemp: "High Pressure",
      recommendedTime: "30 menit presto + 25 menit surut",
      instruction:
        "Masak daging bersama bumbu halus dan santan di panci presto selama 30 menit setelah berdesis (daging langsung empuk seketika). Buka katup, pindahkan ke wajan biasa, dan surutkan kuah dengan api sedang hingga berminyak gelap.",
      proTip: "Metode favorit keluarga modern: menghemat 3 jam waktu memasak namun serat daging tetap utuh lembut.",
    },
  ],
};

export function getApplianceData(recipeSlug: string): ApplianceInstruction[] {
  return (
    RECIPE_APPLIANCE_DATA[recipeSlug] || [
      {
        appliance: "STOVE",
        label: "Kompor Biasa",
        iconName: "Flame",
        recommendedTime: "Sesuai resep",
        instruction: "Gunakan kompor dan wajan tebal untuk mengontrol panas secara presisi.",
        proTip: "Panaskan wajan sebelum menuang minyak agar masakan tidak lengket.",
      },
      {
        appliance: "AIR_FRYER",
        label: "Air Fryer",
        iconName: "Wind",
        recommendedTemp: "180°C",
        recommendedTime: "12 - 15 menit",
        instruction: "Semprot sedikit minyak dan tata bahan agar tidak saling bertumpuk.",
        proTip: "Kocok atau balik bahan di separuh waktu memasak agar kematangan merata.",
      },
      {
        appliance: "OVEN",
        label: "Oven",
        iconName: "Utensils",
        recommendedTemp: "190°C",
        recommendedTime: "20 - 25 menit",
        instruction: "Panaskan oven terlebih dahulu selama 10 menit sebelum bahan dimasukkan.",
        proTip: "Gunakan loyang datar beralas kertas baking untuk memudahkan pembersihan.",
      },
    ]
  );
}
