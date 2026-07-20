// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file buffer directly to Cloudinary
 */
export async function uploadToCloudinary(fileBuffer: Buffer, folder: string = "/SMAIN/properties"): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Cloudinary upload returned no result."));
        resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
}

/**
 * Deletes an image from Cloudinary using its secure URL
 */
export async function deleteFromCloudinary(url: string): Promise<void> {
  try {
    // Extract the public ID from the secure URL
    // e.g., https://res.cloudinary.com/demo/image/upload/v1234567/properties/img_name.jpg -> properties/img_name
    const parts = url.split("/upload/");
    if (parts.length < 2) return;
    
    const publicIdWithExtension = parts[1].replace(/^v\d+\//, ""); // Remove version string if present
    const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf("."));

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", url, error);
  }
}