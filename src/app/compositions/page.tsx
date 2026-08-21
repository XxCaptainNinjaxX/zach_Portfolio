import type { Metadata } from "next";
import { Compositions } from "@/app/compositions/components/Compositions";

export const metadata: Metadata = {
  title: "Compositions",
  description:
    "The complete catalogue of orchestral, chamber, choral, and solo works.",
};

export default function Page() {
  return <Compositions />;
}
