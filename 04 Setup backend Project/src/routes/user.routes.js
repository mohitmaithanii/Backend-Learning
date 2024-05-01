import { Router } from "express";

// Importing functions from the user controller to handle user-related operations
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Creating a new instance of the Router class
const router = Router();

// Defining a POST route for user registration, allowing uploads of avatar and coverImage files
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    registerUser
);

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
