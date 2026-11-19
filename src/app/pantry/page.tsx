import { PantryClient } from "./pantry-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pantry & Kulkas Pintar - Masak dari Bahan Anda | Luminaire Kitchen",
  description:
    "Cari resep makanan berdasarkan persediaan bahan di dapur Anda untuk meminimalkan food waste.",
};

export default function PantryPage() {
  return <PantryClient />;
}
