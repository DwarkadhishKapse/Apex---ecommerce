import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import cloudinaryStorage from "multer-storage-cloudinary";

const storage = cloudinaryStorage({
  cloudinary,
  folder: "products",
  allowedFormats: ["jpg", "jpeg", "png", "webp"],
});

const upload = multer({ storage });

export default upload;
