// models/PropertyListing.ts

import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPropertyFAQ {
  question: string;
  answer: string;
}

export interface IProperty extends Document {
  propertyName: string;
  slug: string;

  listingType: "sale" | "rent";
  propertyType: string;
  location?: string;
  description?: string;

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

  faqs: IPropertyFAQ[];

  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    propertyName: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    listingType: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
    },

    propertyType: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "north-goa",
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: String,
      default: null,
    },

    bedroom: {
      type: String,
    },

    bathroom: {
      type: String,
      default: null,
    },

    sizeSqft: {
      type: String,
      default: null,
    },

    address: {
      type: String,
      required: true,
    },

    subArea: {
      type: String,
    },

    googleMapUrl: {
      type: String,
      default: null,
    },

    developerName: {
      type: String,
      // required: true,
      default: null,
    },

    propertyImages: [
      {
        type: String,
        required: true,
      },
    ],

    propertyBrochure: {
      type: String,
      default: null,
    },

    videoLink: {
      type: String,
      default: null,
    },

    propertyDetails: {
      type: String,
      required: true,
    },

    highlights: {
      type: [String],
      default: [],
    },

    featuresAmenities: {
      type: [String],
      default: [],
    },

    nearby: {
      type: [String],
      default: [],
    },

    extraHighlights: {
      type: [String],
      default: [],
    },

    extraInfo: {
      type: [String],
      default: [],
    },

    status: {
      type: Boolean,
      default: true,
    },

    metaTitle: {
      type: String,
      default: null,
    },

    metaDescription: {
      type: String,
      default: null,
    },

    metaKeywords: {
      type: String,
      default: null,
    },

    faqs: [
      {
        question: {
          type: String,
          trim: true,
        },
        answer: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>(
    "Property",
    PropertySchema
  );

export default Property;