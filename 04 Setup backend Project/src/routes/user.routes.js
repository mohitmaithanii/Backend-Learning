import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

// defining a route for the /register endpoint
router.route("/register").post(registerUser);

export default router;
