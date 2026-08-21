import type { Metadata } from "next";
import { About } from "@/app/about/components/About";
import { site } from "@/components/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.bioShort,
};

export default function Page() {
  return <About />;
}
