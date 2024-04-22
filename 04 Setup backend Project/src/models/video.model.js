// Import necessary modules
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define the video schema with the following fields:
const videoSchema = new Schema(
    {
        videoFile: {
            type: String, // Cloudinary URL
            required: true,
        },
        thumbnail: {
            type: String, // Cloudinary URL
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Number,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

// Add the mongoose-aggregate-paginate-v2 plugin to the schema
videoSchema.plugin(mongooseAggregatePaginate);

// Export the Video model
export const Video = mongoose.model("Video", videoSchema);
