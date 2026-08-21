import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompositionDetail } from "@/app/compositions/[slug]/components/CompositionDetail";
import { allSlugs, getBySlug } from "@/lib/compositions";

type CompositionPageProps = {
  // Next 16: params is a Promise. Synchronous access was removed in this major.
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CompositionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const composition = getBySlug(slug);

  if (!composition) return {};

  return {
    title: composition.title,
    description: composition.blurb,
    openGraph: {
      title: composition.title,
      description: composition.blurb,
      url: `/compositions/${composition.slug}`,
    },
  };
}

export default async function Page({ params }: CompositionPageProps) {
  const { slug } = await params;
  const composition = getBySlug(slug);

  if (!composition) notFound();

  return <CompositionDetail composition={composition} />;
}
