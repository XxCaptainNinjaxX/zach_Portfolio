import type { Metadata } from "next";
import { Achievements } from "@/app/achievements/components/Achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards, commissions, premieres, and residencies, listed by year.",
};

export default function Page() {
  return <Achievements />;
}
