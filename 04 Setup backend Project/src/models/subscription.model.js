import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        // The subscriber field is an ObjectId that references the User model
        subscriber: {
            type: Schema.Types.ObjectId, // one who is subscriber
            ref: "User",
        },
        // The channel field is an ObjectId that references the User model
        channel: {
            type: Schema.Types.ObjectId, // one to whom "subscriber" is subscribing
            ref: "User",
        },
    },
    // Enable timestamps for the schema (createdAt and updatedAt fields)
    { timestamps: true }
);

// Create a mongoose model from the subscriptionSchema and export it
export const Subscription = mongoose.model("Subscription", subscriptionSchema);
