import multer from "multer";

// Define a disk storage configuration for multer
const storage = multer.diskStorage({
    // Specify the destination directory for uploaded files
    destination: function (req, file, cb) {
        // Set the destination to./public/temp
        cb(null, "./public/temp");
    },
    // Define a function to generate a filename for each uploaded file
    filename: function (req, file, cb) {
        // Use the original filename from the request
        cb(null, file.originalname);
    },
});

// Create an upload middleware instance with the defined storage configuration
export const upload = multer({
    storage,
});
