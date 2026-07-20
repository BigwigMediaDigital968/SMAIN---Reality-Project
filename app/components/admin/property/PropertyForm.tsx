"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import JoditEditor from "jodit-react";
import { adminFetch } from "@/app/lib/admin-fetch";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  X,
  Upload,
  Image,
  ImageOff,
  GripVertical,
  DollarSign,
  Bed,
  Bath,
  Maximize,
  Building,
  MapPin,
  User,
  FileText,
  List,
  MapPinned,
  Globe,
  Clock,
} from "lucide-react";

interface Property {
  id?: string;
  propertyName: string;
  slug: string;
  listingType: "sale" | "rent";
  propertyType: string;
  location?: string;
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

interface PropertyFormProps {
  property?: Property | null;
  isEdit?: boolean;
}

const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Penthouse",
  "Plot",
  "Commercial",
  "Row House",
  "Studio",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Lighter sanitizer used while the user is actively typing in the slug
// field: lowercases and strips invalid characters but does NOT collapse
// or trim hyphens, so typing "abc-def" doesn't get mangled mid-keystroke.
function sanitizeSlugInput(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

const DEFAULT_PROPERTY: Partial<Property> = {
  propertyName: "",
  slug: "",
  listingType: "sale",
  propertyType: "Apartment",
  location: "north-goa",
  price: "",
  bedroom: "",
  bathroom: "",
  sizeSqft: "",
  address: "",
  subArea: "",
  googleMapUrl: "",
  developerName: "",
  propertyImages: [""],
  propertyBrochure: "",
  videoLink: "",
  propertyDetails: "",
  highlights: [""],
  featuresAmenities: [""],
  nearby: [""],
  extraHighlights: [""],
  extraInfo: [""],
  status: true,
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  faqs: [{ question: "", answer: "" }],
};

// ── ArrayField moved OUTSIDE PropertyForm ───────────────────────────────────
// This was the bug: defining ArrayField inside PropertyForm's function body
// created a brand new component type on every render, so React unmounted
// and remounted the <input> DOM nodes on every keystroke, causing the input
// to lose focus after typing a single character.
function ArrayField({
  label,
  values,
  onChange,
  onAdd,
  onRemove,
}: {
  label: string;
  values: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-[#71717A]">{label}</label>
      {values.map((val, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={val}
            onChange={(e) => onChange(idx, e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: "#0A0A0F",
              border: "1px solid #27272A",
              color: "#E4E4E7",
            }}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          {values.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="px-3 py-2 rounded-xl cursor-pointer hover:opacity-70 transition-opacity"
              style={{ backgroundColor: "#2D0A0A", color: "#F87171" }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="text-xs font-medium text-[#6366F1] hover:text-[#818CF8] transition-colors cursor-pointer"
      >
        + Add {label}
      </button>
    </div>
  );
}

// ImageField now just manages a locally-ordered list of existing URLs / new Files.
// No uploads happen here — that's the backend's job.

interface ImageItem {
  id: string;
  kind: "existing" | "new";
  url: string;   // existing: real URL. new: local blob preview URL.
  file?: File;   // present when kind === "new"
}

function ImageField({
  items,
  onChange,
}: {
  items: ImageItem[];
  onChange: (items: ImageItem[]) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const newItems: ImageItem[] = Array.from(fileList).map((file) => ({
      id: crypto.randomUUID(),
      kind: "new",
      url: URL.createObjectURL(file),
      file,
    }));
    onChange([...items, ...newItems]);
  }

  function removeItem(id: string) {
    const item = items.find((i) => i.id === id);
    if (item?.kind === "new") URL.revokeObjectURL(item.url);
    onChange(items.filter((i) => i.id !== id));
  }

  function reorder(from: number, to: number) {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  }

  const handleDragStart = (idx: number) => (e: React.DragEvent) => {
    setDragIndex(idx);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
  };
  const handleDragOver = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (idx !== overIndex) setOverIndex(idx);
  };
  const handleDrop = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === idx) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    reorder(dragIndex, idx);
    setDragIndex(null);
    setOverIndex(null);
  };
  const handleDragEnd = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[#71717A] mb-1.5">
        Property Images
      </label>

      <label
        className="flex items-center gap-2 w-fit px-4 py-2.5 rounded-xl text-sm cursor-pointer transition-all hover:opacity-80"
        style={{ backgroundColor: "#1E1E2E", border: "1px solid #27272A", color: "#A1A1AA" }}
      >
        <Upload size={16} />
        Add Images
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {items.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver(index)}
              onDrop={handleDrop(index)}
              onDragEnd={handleDragEnd}
              className="relative group rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
              style={{
                border: overIndex === index ? "1px solid #6366F1" : "1px solid #27272A",
                opacity: dragIndex === index ? 0.4 : 1,
              }}
            >
              <img src={item.url} className="w-full h-24 object-cover" alt="" />

              {item.kind === "new" && (
                <span className="absolute top-1 left-1 bg-[#6366F1]/90 text-white text-[9px] px-1.5 py-0.5 rounded">
                  New
                </span>
              )}

              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="bg-black/70 text-white text-xs px-1.5 py-0.5 rounded"
                >
                  <X size={12} />
                </button>
              </div>

              {index === 0 && (
                <span className="absolute bottom-1 left-1 bg-[#6366F1] text-white text-[10px] px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-[#71717A] mt-2">
        Drag to reorder · Click ✕ to remove · First image = cover
      </p>
    </div>
  );
}

export default function PropertyForm({ property, isEdit = false }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Property>>(
    property || DEFAULT_PROPERTY
  );
  // Tracks whether the user has manually typed into the slug field.
  // While false, slug auto-syncs with propertyName on every keystroke.
  // In edit mode we start "touched" so we never silently rewrite an
  // existing, possibly-indexed slug.
  const [slugTouched, setSlugTouched] = useState(isEdit);

  const [imageItems, setImageItems] = useState<ImageItem[]>(() =>
    (property?.propertyImages || []).filter(Boolean).map((url) => ({
      id: crypto.randomUUID(),
      kind: "existing" as const,
      url,
    }))
  );

  const joditConfig = useMemo(
    () => ({
      theme: "light",
      iframe: false, // ← DIV mode: main document CSS applies
      height: 420,
      minHeight: 300,
      editorStyle: {
        // applied directly to .jodit-wysiwyg element
        background: "#1f2937",
        color: "#f3f4f6",
        fontSize: "15px",
        lineHeight: "1.7",
        fontFamily: "inherit",
      },
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      useSearch: false,
    }),
    []
  );

  // Auto-generate slug from propertyName as the user types, until they
  // manually edit the slug field themselves.
  useEffect(() => {
    if (property) {
      setFormData({
        ...(DEFAULT_PROPERTY as Partial<Property>),
        ...property,
        location: property.location ?? (DEFAULT_PROPERTY.location as string),
      });
      setImageItems(
        (property.propertyImages || []).filter(Boolean).map((url) => ({
          id: crypto.randomUUID(),
          kind: "existing" as const,
          url,
        }))
      );
      setSlugTouched(isEdit);
      return;
    }

    setFormData(DEFAULT_PROPERTY as Partial<Property>);
    setImageItems([]);
    setSlugTouched(false);
  }, [property, isEdit]);

  useEffect(() => {
    if (slugTouched) return;
    setFormData((prev) => ({
      ...prev,
      slug: prev.propertyName ? slugify(prev.propertyName) : "",
    }));
  }, [formData.propertyName, slugTouched]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === "slug") {
      setSlugTouched(true);
      setFormData((prev) => ({ ...prev, slug: sanitizeSlugInput(value) }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleArrayChange = (
    field: keyof Property,
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const arr = [...((prev[field] as string[]) || [])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: keyof Property) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...((prev[field] as string[]) || []), ""],
    }));
  };

  const removeArrayItem = (field: keyof Property, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: ((prev[field] as string[]) || []).filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    setFormData((prev) => {
      const faqs = [...(prev.faqs || [])];
      faqs[index] = { ...faqs[index], [field]: value };
      return { ...prev, faqs };
    });
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }));
  };

  // const handleImageChange = (index: number, value: string) => {
  //   setFormData((prev) => {
  //     const images = [...(prev.propertyImages || [])];
  //     images[index] = value;
  //     return { ...prev, propertyImages: images };
  //   });
  // };

  // const addImageField = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     propertyImages: [...(prev.propertyImages || []), ""],
  //   }));
  // };

  // const removeImageField = (index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     propertyImages: (prev.propertyImages || []).filter((_, i) => i !== index),
  //   }));
  // };

  // const reorderImages = (fromIndex: number, toIndex: number) => {
  //   setFormData((prev) => {
  //     const images = [...(prev.propertyImages || [])];
  //     const [moved] = images.splice(fromIndex, 1);
  //     images.splice(toIndex, 0, moved);
  //     return { ...prev, propertyImages: images };
  //   });
  // };

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSaving(true);

  try {
    const cleanData = {
      ...(DEFAULT_PROPERTY as Partial<Property>),
      ...formData,
      location: formData.location ?? (DEFAULT_PROPERTY.location as string),
      highlights: (formData.highlights || []).filter(Boolean),
      featuresAmenities: (formData.featuresAmenities || []).filter(Boolean),
      nearby: (formData.nearby || []).filter(Boolean),
      extraHighlights: (formData.extraHighlights || []).filter(Boolean),
      extraInfo: (formData.extraInfo || []).filter(Boolean),
      faqs: (formData.faqs || []).filter((f) => f.question && f.answer),
    };
    delete (cleanData as any).propertyImages; // images handled separately below

    // Build the order the backend should reassemble, and collect new files
    // in the same relative order so it can zip "new:<n>" tokens to files[n].
    const newFiles: File[] = [];
    const imageOrder = imageItems.map((item) => {
      if (item.kind === "existing") return `existing:${item.url}`;
      const idx = newFiles.length;
      newFiles.push(item.file as File);
      return `new:${idx}`;
    });

    console.log(cleanData)

    const fd = new FormData();
    fd.append("data", JSON.stringify(cleanData));
    fd.append("imageOrder", JSON.stringify(imageOrder));
    newFiles.forEach((file) => fd.append("images", file)); // appended in "new:<n>" order

    const url = "/api/admin/properties";
    const method = isEdit ? "PATCH" : "POST";
    if (isEdit && property?.id) fd.append("id", property.id);

    const res = await adminFetch(url, {
      method,
      body: fd, // no Content-Type header — browser sets multipart boundary
    });

    if (!res.ok) throw new Error("Failed to save property");
    router.push("/admin/properties");
  } catch (err) {
    console.error(err);
  } finally {
    setSaving(false);
  }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Building size={18} className="text-[#6366F1]" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Property Name *
            </label>
            <input
              type="text"
              name="propertyName"
              value={formData.propertyName || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="Enter property name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug || ""}
              onChange={handleChange}
              onBlur={() =>
                setFormData((prev) => ({ ...prev, slug: slugify(prev.slug || "") }))
              }
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="property-slug"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Listing Type *
            </label>
            <select
              name="listingType"
              value={formData.listingType || "sale"}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
            >
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Property Type *
            </label>
            <select
              name="propertyType"
              value={formData.propertyType || "Apartment"}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
            >
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Location *
            </label>
            <select
              name="location"
              value={formData.location || "north-goa"}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
            >
              <option value="north-goa">North Goa</option>
              <option value="south-goa">South Goa</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Price *
            </label>
            <input
              type="text"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="e.g. 50,00,000"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Developer Name *
            </label>
            <input
              type="text"
              name="developerName"
              value={formData.developerName || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="Enter developer name"
            />
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Maximize size={18} className="text-[#6366F1]" />
          Property Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Bedrooms
            </label>
            <input
              type="text"
              name="bedroom"
              value={formData.bedroom || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="e.g. 2 BHK"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Bathrooms
            </label>
            <input
              type="text"
              name="bathroom"
              value={formData.bathroom || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="e.g. 2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Size (Sq Ft)
            </label>
            <input
              type="text"
              name="sizeSqft"
              value={formData.sizeSqft || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="e.g. 1200"
            />
          </div>
        </div>
      </section>

      {/* Location */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-[#6366F1]" />
          Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="Enter full address"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Sub Area
            </label>
            <input
              type="text"
              name="subArea"
              value={formData.subArea || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="e.g. Whitefield"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Google Map URL
            </label>
            <input
              type="url"
              name="googleMapUrl"
              value={formData.googleMapUrl || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>
      </section>

      {/* Media */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Image size={18} className="text-[#6366F1]" />
          Media
        </h3>
        <div className="space-y-4">
          <ImageField items={imageItems} onChange={setImageItems} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#71717A] mb-1.5">
                Property Brochure URL
              </label>
              <input
                type="url"
                name="propertyBrochure"
                value={formData.propertyBrochure || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#0A0A0F",
                  border: "1px solid #27272A",
                  color: "#E4E4E7",
                }}
                placeholder="Brochure PDF URL"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#71717A] mb-1.5">
                Video Link
              </label>
              <input
                type="url"
                name="videoLink"
                value={formData.videoLink || ""}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#0A0A0F",
                  border: "1px solid #27272A",
                  color: "#E4E4E7",
                }}
                placeholder="YouTube/Vimeo URL"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Property Details - Rich Text */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FileText size={18} className="text-[#6366F1]" />
          Property Details
        </h3>
        <JoditEditor
          value={formData.propertyDetails || ""}
          config={joditConfig}
          onChange={(html: string) =>
            setFormData((prev) => ({ ...prev, propertyDetails: html }))
          }
          onBlur={(html: string) =>
            setFormData((prev) => ({ ...prev, propertyDetails: html }))
          }
        />
      </section>

      {/* Highlights & Amenities */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <List size={18} className="text-[#6366F1]" />
          Highlights & Amenities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ArrayField
            label="Highlights"
            values={formData.highlights || []}
            onChange={(idx, val) => handleArrayChange("highlights", idx, val)}
            onAdd={() => addArrayItem("highlights")}
            onRemove={(idx) => removeArrayItem("highlights", idx)}
          />
          <ArrayField
            label="Features & Amenities"
            values={formData.featuresAmenities || []}
            onChange={(idx, val) => handleArrayChange("featuresAmenities", idx, val)}
            onAdd={() => addArrayItem("featuresAmenities")}
            onRemove={(idx) => removeArrayItem("featuresAmenities", idx)}
          />
          <ArrayField
            label="Nearby Places"
            values={formData.nearby || []}
            onChange={(idx, val) => handleArrayChange("nearby", idx, val)}
            onAdd={() => addArrayItem("nearby")}
            onRemove={(idx) => removeArrayItem("nearby", idx)}
          />
          <ArrayField
            label="Extra Highlights"
            values={formData.extraHighlights || []}
            onChange={(idx, val) => handleArrayChange("extraHighlights", idx, val)}
            onAdd={() => addArrayItem("extraHighlights")}
            onRemove={(idx) => removeArrayItem("extraHighlights", idx)}
          />
        </div>
      </section>

      {/* Extra Info */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Clock size={18} className="text-[#6366F1]" />
          Extra Information
        </h3>
        <ArrayField
          label="Extra Information"
          values={formData.extraInfo || []}
          onChange={(idx, val) => handleArrayChange("extraInfo", idx, val)}
          onAdd={() => addArrayItem("extraInfo")}
          onRemove={(idx) => removeArrayItem("extraInfo", idx)}
        />
      </section>

      {/* FAQs */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Globe size={18} className="text-[#6366F1]" />
          FAQs
        </h3>
        <div className="space-y-4">
          {(formData.faqs || []).map((faq, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "#0A0A0F",
                    border: "1px solid #27272A",
                    color: "#E4E4E7",
                  }}
                  placeholder="Question"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all resize-none"
                  style={{
                    backgroundColor: "#0A0A0F",
                    border: "1px solid #27272A",
                    color: "#E4E4E7",
                  }}
                  placeholder="Answer"
                />
              </div>
              {(formData.faqs?.length || 0) > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaq(idx)}
                  className="px-3 py-2 rounded-xl cursor-pointer hover:opacity-70 transition-opacity mt-1"
                  style={{ backgroundColor: "#2D0A0A", color: "#F87171" }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            className="text-xs font-medium text-[#6366F1] hover:text-[#818CF8] transition-colors cursor-pointer"
          >
            + Add FAQ
          </button>
        </div>
      </section>

      {/* SEO */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <h3 className="text-lg font-bold text-white mb-4">SEO Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Meta Title
            </label>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="SEO Title"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Meta Keywords
            </label>
            <input
              type="text"
              name="metaKeywords"
              value={formData.metaKeywords || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="keyword1, keyword2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#71717A] mb-1.5">
              Meta Description
            </label>
            <input
              type="text"
              name="metaDescription"
              value={formData.metaDescription || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#0A0A0F",
                border: "1px solid #27272A",
                color: "#E4E4E7",
              }}
              placeholder="SEO Description"
            />
          </div>
        </div>
      </section>

      {/* Status */}
      <section
        className="rounded-2xl p-6"
        style={{ backgroundColor: "#111118", border: "1px solid #1E1E2E" }}
      >
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="status"
            id="status"
            checked={formData.status ?? true}
            onChange={handleChange}
            className="w-4 h-4 rounded"
            style={{ accentColor: "#6366F1" }}
          />
          <label htmlFor="status" className="text-sm text-[#71717A]">
            Active (Property will be visible on website)
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#27272A]">
        <button
          type="button"
          onClick={() => router.push("/admin/properties")}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-80"
          style={{
            backgroundColor: "#1E1E2E",
            color: "#A1A1AA",
            border: "1px solid #27272A",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all hover:opacity-80 flex items-center gap-2"
          style={{ backgroundColor: "#6366F1", color: "#fff" }}
        >
          {saving && <Loader2 size={14} className="animate-spin" />}
          {saving ? "Saving..." : isEdit ? "Update Property" : "Add Property"}
        </button>
      </div>
    </form>
  );
}