export interface KitchenEmergency {
  id: string;
  problem: string;
  category: "Rasa" | "Tekstur" | "Kuah & Saus" | "Gorengan";
  urgency: "Tinggi" | "Sedang";
  quickFix: string;
  scientificReason: string;
  proTip: string;
}

export const KITCHEN_EMERGENCIES: KitchenEmergency[] = [
  {
    id: "asin",
    problem: "Masakan Terlalu Asin / Kebanyakan Garam",
    category: "Rasa",
    urgency: "Tinggi",
    quickFix:
      "Masukkan 1-2 butir kentang mentah yang sudah dikupas dan dipotong besar ke dalam kuah, masak selama 10 menit lalu angkat. Atau tambahkan sedikit air kaldu tawar + 1 sdt gula merah + perasan jeruk nipis.",
    scientificReason:
      "Pati alami pada kentang mentah menyerap cairan garam pekat melalui proses osmosis seperti spons.",
    proTip: "Jangan menambah garam di awal sebelum kuah menyusut, karena kuah yang surut akan semakin pekat dan asin.",
  },
  {
    id: "pedas",
    problem: "Masakan Terlalu Pedas / Cabai Berlebihan",
    category: "Rasa",
    urgency: "Tinggi",
    quickFix:
      "Tambahkan produk berlemak seperti santan kental, susu, minyak kelapa, atau sejumput gula merah dan perasan jeruk limau segar.",
    scientificReason:
      "Kapsaisin pada cabai larut dalam lemak (fat-soluble), bukan dalam air. Menambah lemak atau gula membantu membungkus reseptor pedas di lidah.",
    proTip: "Bisa juga disajikan bersama sayuran rebus tawar (seperti mentimun atau kubis) sebagai penetral alami.",
  },
  {
    id: "santan-pecah",
    problem: "Kuah Santan Pecah Minyak / Menggumpal",
    category: "Kuah & Saus",
    urgency: "Tinggi",
    quickFix:
      "Segera kecilkan api ke level minimal. Larutkan 1 sdm tepung maizena dalam 2 sdm air dingin, tuangkan ke dalam kuah sambil diaduk cepat dengan whisk searah jarum jam hingga emulsi bersatu kembali.",
    scientificReason:
      "Santan pecah karena protein terdenaturasi akibat panas terlalu tinggi. Pati maizena bertindak sebagai zat pengemulsi darurat.",
    proTip: "Selalu aduk santan perlahan searah jarum jam saat mendidih pertama kali dan gunakan api sedang-kecil.",
  },
  {
    id: "gorengan-lembek",
    problem: "Katsu / Gorengan Tidak Renyah / Berminyak Lembek",
    category: "Gorengan",
    urgency: "Sedang",
    quickFix:
      "Jangan digoreng ulang di minyak biasa! Panaskan di atas wajan teflon kering tanpa minyak api sedang selama 3-4 menit bolak-balik, atau masukkan ke Air Fryer suhu 180°C selama 3-5 menit.",
    scientificReason:
      "Panas konveksi kering akan menguapkan uap air yang terjebak di pori-pori tepung roti tanpa menyerap minyak baru.",
    proTip: "Tiriskan gorengan dengan posisi berdiri di atas rak kawat (cooling rack), jangan menumpuk di atas tisu basah.",
  },
  {
    id: "daging-alot",
    problem: "Daging Sapi / Ayam Alot & Susah Dikunyah",
    category: "Tekstur",
    urgency: "Sedang",
    quickFix:
      "Tutup wajan rapat-rapat dan gunakan teknik simmer api sangat kecil selama 30-45 menit tambahan. Anda juga bisa menambahkan 1 iris nanas muda matang (masak 10 menit lalu keluarkan).",
    scientificReason:
      "Enzim bromelain pada nanas memecah ikatan serat kolagen daging dengan cepat.",
    proTip: "Hati-hati: jangan biarkan nanas lebih dari 15 menit agar serat daging tidak hancur menjadi bubur.",
  },
  {
    id: "kuah-terlalu-encer",
    problem: "Kuah Kari / Gulai / Saus Terlalu Encer",
    category: "Kuah & Saus",
    urgency: "Sedang",
    quickFix:
      "Ambil 1 buah kentang rebus dari kuah, lumatkan halus dengan garpu di mangkuk, lalu aduk kembali ke dalam kuah. Atau biarkan panci terbuka dan masak dengan api sedang hingga cairan menguap.",
    scientificReason:
      "Pengentalan berbasis kentang memberikan tekstur lembut alami tanpa mengubah cita rasa khas rempah bumbu.",
    proTip: "Mengurangi cairan dengan panci terbuka lebih menjaga kepekatan aroma dibandingkan menambah tepung berlebihan.",
  },
];
