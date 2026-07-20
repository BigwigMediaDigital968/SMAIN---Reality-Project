"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PropertyForm from "@/app/components/admin/property/PropertyForm";
import { adminFetch } from "@/app/lib/admin-fetch";
import { Loader2 } from "lucide-react";

interface Property {
  id: string;
  propertyName: string;
  slug: string;
  listingType: "sale" | "rent";
  propertyType: string;
  price: string;
  bedroom?: string;
  bathroom?: string | null;
  sizeSqft: string;
  address: string;
  subArea?: string;
  googleMapUrl?: string | null;
  developerName: string;
  propertyImages: string[];
  propertyBrochure?: string | null;
  videoLink?: string | null;
  propertyDetails: string;
  highlights: string[];
  featuresAmenities: string[];
  nearby: string[];
  extraHighlights: string[];
  extraInfo: string[];
  status: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  faqs: { question: string; answer: string }[];
}

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const id = params.id as string;
        const res = await adminFetch(`/api/admin/properties?id=${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch property");
        }

        const data = await res.json();
        if (data.properties && data.properties.length > 0) {
          setProperty(data.properties[0]);
        } else {
          setError("Property not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen p-6 lg:p-10 flex items-center justify-center" style={{ backgroundColor: "#0A0A0F" }}>
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={24} className="animate-spin" style={{ color: "#6366F1" }} />
          <p className="text-sm" style={{ color: "#52525B" }}>Loading property...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 lg:p-10 flex items-center justify-center" style={{ backgroundColor: "#0A0A0F" }}>
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-2">Error</p>
          <p className="text-sm" style={{ color: "#52525B" }}>{error}</p>
          <button
            onClick={() => router.push("/admin/properties")}
            className="mt-4 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer"
            style={{ backgroundColor: "#6366F1", color: "#fff" }}
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-10" style={{ backgroundColor: "#0A0A0F" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Edit Property
        </h1>
        <p className="text-sm mt-1" style={{ color: "#52525B" }}>
          Update property details for "{property?.propertyName}"
        </p>
      </div>

      {property && <PropertyForm property={property} isEdit={true} />}
    </div>
  );
}