import { ExploreClient } from "./explore-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eksplorasi Resep Makanan - Filter & Pencarian Lengkap | Luminaire Kitchen",
  description:
    "Cari dan temukan aneka resep makanan dengan filter diet (Halal, Vegan, Keto), durasi memasak, dan tingkat kesulitan.",
};

export default function ExplorePage() {
  return <ExploreClient />;
}
