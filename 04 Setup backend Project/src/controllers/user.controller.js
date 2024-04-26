import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating refreshing and access token."
        );
    }
};

//* Register User
const registerUser = asyncHandler(async (req, res) => {
    // 1. get user details from frontend

    const { fullName, email, username, password } = req.body;
    // console.log("email: ", email);

    // 2. validation - not empty
    if (
        [fullName, email, username, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "All field are required");
    }

    // 3. check if user already exists - username, email
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "Username or Email already exist");
    }
    // console.log(req.files);

    // 4. check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (
        req.files &&
        Array.isArray(req.files.coverImage) &&
        req.files.coverImage.length > 0
    ) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // 5. upload them to cloudinary - avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.");
    }

    // 6. create user object - create entry in db
    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });

    // 7. remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // 8. check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Failed to create account.");
    }

    // 9. return response
    return res
        .status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered Successfully.")
        );
});

//* Login User
const loginUser = asyncHandler(async (req, res) => {
    // 1. req body - data
    const { email, username, password } = req.body;

    // 2. username or email
    if (!username || !email) {
        throw new ApiError(400, "username or email is required.");
    }

    // 3. find the user
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        throw new ApiError(400, "User dose not exist.");
    }

    // 4. password check
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials.");
    }

    // 5. access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    // 6. send cookies
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged In Successfully."
            )
        );
});

//* Logout User
const logoutUser = asyncHandler(async (req, res) => {
    User.findByIdAndUpdate(
        req.use._id,
        {
            $set: {
                refreshToken: undefined,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "User logged Out."));
});

export { registerUser, loginUser, logoutUser };
