interface Property {
  id: string;
  propertyName: string;
  slug: string;
  listingType: "sale" | "rent";
  propertyType: string;
  status: boolean;
  createdAt: string;
}

export default function PropertyStatsCards({ properties }: { properties: Property[] }) {
  const total = properties.length;
  const active = properties.filter((p) => p.status === true).length;
  const inactive = properties.filter((p) => p.status === false).length;
  const forSale = properties.filter((p) => p.listingType === "sale").length;
  const forRent = properties.filter((p) => p.listingType === "rent").length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {/* Total */}
      <div className="col-span-2 lg:col-span-1 bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5">
        <p className="text-[#71717A] text-xs font-medium uppercase tracking-widest mb-3">
          Total Properties
        </p>
        <p className="text-4xl font-bold text-white">{total}</p>
        <p className="text-[#52525B] text-xs mt-1">All time</p>
      </div>

      {/* Active */}
      <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <p className="text-[#71717A] text-xs font-medium uppercase tracking-widest">
            Active
          </p>
        </div>
        <p className="text-3xl font-bold text-white">{active}</p>
        <p className="text-[#52525B] text-xs mt-1">
          {total > 0 ? Math.round((active / total) * 100) : 0}% of total
        </p>
      </div>

      {/* Inactive */}
      <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <p className="text-[#71717A] text-xs font-medium uppercase tracking-widest">
            Inactive
          </p>
        </div>
        <p className="text-3xl font-bold text-white">{inactive}</p>
        <p className="text-[#52525B] text-xs mt-1">
          {total > 0 ? Math.round((inactive / total) * 100) : 0}% of total
        </p>
      </div>

      {/* For Sale */}
      <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <p className="text-[#71717A] text-xs font-medium uppercase tracking-widest">
            For Sale
          </p>
        </div>
        <p className="text-3xl font-bold text-white">{forSale}</p>
        <p className="text-[#52525B] text-xs mt-1">
          {total > 0 ? Math.round((forSale / total) * 100) : 0}% of total
        </p>
      </div>

      {/* For Rent */}
      <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          <p className="text-[#71717A] text-xs font-medium uppercase tracking-widest">
            For Rent
          </p>
        </div>
        <p className="text-3xl font-bold text-white">{forRent}</p>
        <p className="text-[#52525B] text-xs mt-1">
          {total > 0 ? Math.round((forRent / total) * 100) : 0}% of total
        </p>
      </div>
    </div>
  );
}