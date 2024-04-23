import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// configuring cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// defining a function to upload a file to cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    try {
        // returning null if no file path is provided
        if (!localFilePath) return null;

        // uploading the file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // logging the url of the uploaded file
        console.log("File is uploaded on cloudinary ", response.url);

        // returning the response
        return response;
    } catch (error) {
        // removing the locally saved temporary file if the upload operation failed
        fs.unlinkSync(localFilePath);

        // returning null
        return null;
    }
};

// exporting the uploadOnCloudinary function
export { uploadOnCloudinary };
