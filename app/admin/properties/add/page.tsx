import PropertyForm from "@/app/components/admin/property/PropertyForm";

export default function AddPropertyPage() {
  return (
    <div className="min-h-screen p-6 lg:p-10" style={{ backgroundColor: "#0A0A0F" }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Add New Property
        </h1>
        <p className="text-sm mt-1" style={{ color: "#52525B" }}>
          Fill in the property details below
        </p>
      </div>

      <PropertyForm />
    </div>
  );
}