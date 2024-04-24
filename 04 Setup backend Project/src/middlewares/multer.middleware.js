// importing multer module
import multer from "multer";

// configuring multer storage object
const storage = multer.diskStorage({
    // destination function to specify where the uploaded files will be stored
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // specifying the destination folder
    },
    // filename function to specify the name of the uploaded files
    filename: function (req, file, cb) {
        cb(null, file.originalname); // using the original file name
    },
});

export const upload = multer({ storage });
