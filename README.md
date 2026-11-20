# 🍳 Resepy

> Full-scale interactive recipe platform & modern smart pantry (Next.js 16, React 19, TypeScript, Tailwind CSS, Prisma ORM).

![Resepy](https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Main features

- 📐 **Dynamic Portion Scaler & Fractional Formatter**: interactive portion scaling (+/-) with kitchen fraction quantities (`1 ½ tbsp`, `¼ tsp`).
- 🇮🇩 **Hybrid Unit System**: supports Indonesian culinary units (*ruas, siung, sdm, butir, lembar, ikat, batang, potong*) alongside metric (*gram, ml, kg*) & imperial (*cup, oz, lb*).
- 🎙️ **Hands-Free Fullscreen Cooking Mode (`/recipes/[slug]/cook`)**: kitchen-friendly display with large fonts, step-by-step navigation, Screen WakeLock (prevents phone/tablet screen from sleeping), and an independent audio timer with a bell sound when time is up.
- 🧊 **Smart Pantry & Reverse Matcher (`/pantry`)**: *"Cook from what's in the fridge"* feature with expiry date tracking to prevent food waste.
- 📅 **Weekly Meal Planner (`/planner`)**: weekly calendar for breakfast, lunch, and dinner menus.
- 🛒 **Smart Grocery List (`/grocery`)**: automatically merges duplicate ingredients from selected recipes and groups them by supermarket aisle.
- 🥗 **Automated Nutrition & Allergen Calculator**: automatic estimates of calories, protein, fat, and carbohydrates per serving, plus detection of the 8 main allergens.
- ✍️ **Creator Studio (`/studio/recipes/new`)**: multi-component recipe editor (Spice Paste, Marinade, Main Ingredients) and timed instructions.
- 🗄️ **Prisma Database Schema (`prisma/schema.prisma`)**: comprehensive relational data model ready to use for PostgreSQL.

---

## 🚀 Getting started

### 1. Install dependencies
```bash
npm install --ignore-scripts
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run automated unit tests
```bash
npm test
```

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🛠️ Tech stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 + Lucide Icons + Canvas Confetti
- **ORM & Database**: Prisma ORM + PostgreSQL Data Modeling
- **Architecture**: Domain-driven conversion engine, automated nutrition calculator, and reverse pantry matcher

---

## 📄 License
MIT License © 2026 Hugo Agfarizky.
