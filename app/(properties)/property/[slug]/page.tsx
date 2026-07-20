// app/properties/[id]/page.tsx
import { notFound } from "next/navigation";
import { getPropertyBySlugOrId } from "@/app/lib/db";
import PropertyDetailsClient from "./PropertyDetailsClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlugOrId(slug);

  if (!property) {
    notFound(); // Triggers your standard global Next.js 404 page automatically
  }

  return <PropertyDetailsClient property={property} />;
}