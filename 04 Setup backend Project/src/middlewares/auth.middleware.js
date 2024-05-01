import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Attempt to retrieve the JWT from cookies or the Authorization header
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        // If no token is found, throw an Unauthorized error
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify the JWT using the ACCESS_TOKEN_SECRET environment variable
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user in the database using the _id from the decoded JWT
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        );

        // If no user is found, throw an Invalid Access Token error
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach the user object to the request object for further use in the route handlers
        req.user = user;

        // Call the next middleware function in the stack
        next();
    } catch (error) {
        // If any error occurs, throw an Invalid Access Token error with the error message
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
