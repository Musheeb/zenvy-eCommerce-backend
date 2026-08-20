import cloudinary from "../config/cloudinary.config";
import type { UploadApiResponse } from "cloudinary";
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer: Buffer, folder: string) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) throw new Error("Cloudinary upload failed!");
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;
