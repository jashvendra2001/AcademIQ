import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: "dfnsbr6kn",
  api_key: "617443446841147",
  api_secret: "lg6wUkAWUNvsfRAXYLyWmvDAdjk",
});

export const uploadResponse = async (file) => {
  try {
    console.log("Uploading file:", file);
    const cloudinaryResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    console.log("Cloudinary Response:", cloudinaryResponse);
    return cloudinaryResponse;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(error.message);
  }
};
