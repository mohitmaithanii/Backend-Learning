import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    // Use a try-catch block to handle any errors that might occur during the execution of the code inside the try block
    try {
        // Use the mongoose.connect() method to connect to the MongoDB database
        // The method takes in a URL string that includes the MONGODB_URI environment variable and the DB_NAME constant
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        // Log a message to the console indicating that the connection was successful
        // The message includes the host of the database connection
        console.log(
            `\n MONGO DB CONNECTED!! DB HOST: ${connectionInstance.connection.host}`
        );

        // error handler for db connection
    } catch (error) {
        console.log("MONGO DB CONNECTION FAILED ", error);

        // Exit the process with a status code of 1, indicating that an error occurred
        process.exit(1);
    }
};

export default connectDB;
