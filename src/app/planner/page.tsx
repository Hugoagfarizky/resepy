import { PlannerClient } from "./planner-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meal Planner Mingguan - Rencana Menu & Belanja | Luminaire Kitchen",
  description:
    "Rancang menu makanan mingguan untuk sarapan, makan siang, dan makan malam, serta ekspor daftar belanja otomatis.",
};

export default function PlannerPage() {
  return <PlannerClient />;
}
