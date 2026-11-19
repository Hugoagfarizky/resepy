import { StudioClient } from "./studio-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tulis Resep Baru (Creator Studio) | Luminaire Kitchen",
  description: "Buat dan terbitkan resep masakan multi-komponen dengan timer interaktif.",
};

export default function NewRecipePage() {
  return <StudioClient />;
}
