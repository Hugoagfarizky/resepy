import { GroceryClient } from "./grocery-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Belanja Cerdas (Smart Grocery List) | Luminaire Kitchen",
  description:
    "Daftar belanja pintar yang otomatis menggabungkan jumlah bahan dari berbagai resep dan mengelompokkannya per lorong pasar.",
};

export default function GroceryPage() {
  return <GroceryClient />;
}
