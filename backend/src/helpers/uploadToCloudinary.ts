import { cloudinary } from "../config/cloudinary.js";
import { type CloudinaryUploadResponse } from "../types/cloudinary.js";

export function uploadToCloudinary(buffer: Buffer): Promise<CloudinaryUploadResponse> {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{ resource_type: "image", folder: "Ecommerce" },
			(error, result) => {
				if (error) return reject(error);

				resolve(result as CloudinaryUploadResponse);
			},
		);

		uploadStream.end(buffer);
	});
}
