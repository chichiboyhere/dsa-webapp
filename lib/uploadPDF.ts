//lib/uploadPDF.ts
import cloudinary from "@/lib/cloudinary";

export async function uploadPDF(buffer: Uint8Array) {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "dsa_receipts",
        format: "pdf",
        type: "upload",
        access_mode: "public",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      },
    );

    stream.end(Buffer.from(buffer));
  });
}
