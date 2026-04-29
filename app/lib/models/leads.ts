import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  inquiry: string;
  region: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  description: string;
  newsletter: boolean;
  status: "new" | "contacted" | "qualified" | "closed";
  source: string;
  createdAt: string;
  updatedAt: string;
}

const LeadSchema = new Schema<ILead>(
  {
    inquiry: { type: String, default: "general" },
    region: { type: String, default: "" },
    name: { type: String, required: true },
    location: { type: String, default: "" },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, default: "" },
    newsletter: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "closed"],
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

// Prevent model recompilation in Next.js dev
const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
