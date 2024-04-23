import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    // sending a response with status code 200 and a message
    res.status(200).json({ message: "OK!!" });
});

export { registerUser };
