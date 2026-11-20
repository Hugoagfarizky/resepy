# 🍳 Resepy

> Platform Resep Makanan Interaktif & Smart Pantry Modern berskala penuh (Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma ORM).

![Resepy](https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Fitur Utama

- 📐 **Dynamic Portion Scaler & Fractional Formatter**: Skalasi porsi interaktif (+/-) dengan kuantitas pecahan dapur (`1 ½ sdm`, `¼ sdt`).
- 🇮🇩 **Sistem Satuan Hibrida**: Mendukung satuan kuliner Indonesia (*ruas, siung, sdm, butir, lembar, ikat, batang, potong*) berdampingan dengan metrik (*gram, ml, kg*) & imperial (*cup, oz, lb*).
- 🎙️ **Hands-Free Fullscreen Cooking Mode (`/recipes/[slug]/cook`)**: Tampilan ramah dapur dengan font besar, navigasi per langkah, Screen WakeLock (mencegah layar HP/tablet padam), dan timer audio mandiri dengan suara lonceng peringatan saat waktu habis.
- 🧊 **Smart Pantry & Reverse Matcher (`/pantry`)**: Fitur *"Masak dari apa yang ada di kulkas"* dengan pelacak tanggal kedaluwarsa untuk mencegah *food waste*.
- 📅 **Weekly Meal Planner (`/planner`)**: Kalender menu sarapan, makan siang, dan makan malam mingguan.
- 🛒 **Smart Grocery List (`/grocery`)**: Otomatis menggabungkan bahan duplikat dari resep terpilih dan mengelompokkannya per lorong pasar/supermarket.
- 🥗 **Automated Nutrition & Allergen Calculator**: Estimasi otomatis kalori, protein, lemak, dan karbohidrat per sajian, serta deteksi 8 alergen utama.
- ✍️ **Creator Studio (`/studio/recipes/new`)**: Editor resep multi-komponen (Bumbu Halus, Marinasi, Bahan Utama) dan instruksi bertimer.
- 🗄️ **Prisma Database Schema (`prisma/schema.prisma`)**: Model data relasional komprehensif siap pakai untuk PostgreSQL.

---

## 🚀 Memulai (Getting Started)

### 1. Instalasi Dependensi
```bash
npm install --ignore-scripts
```

### 2. Jalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 3. Menjalankan Unit Tests Otomatis
```bash
npm test
```

### 4. Build untuk Production
```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 + Lucide Icons + Canvas Confetti
- **ORM & Database**: Prisma ORM + PostgreSQL Data Modeling
- **Architecture**: Domain-driven conversion engine, automated nutrition calculator, and reverse pantry matcher

---

## 📄 Lisensi
MIT License © 2026 Resepy.