// Import necessary modules
import dotenv from "dotenv";
import connectDB from "./database/index.js";
import { app } from "./app.js";

// Configure dotenv to load environment variables from.env file
dotenv.config({
    path: "./.env",
});

// Connect to the database using the connectDB function imported from./database/index.js
connectDB()
    .then((result) => {
        // Start the server and listen on the specified port
        app.listen(process.env.PORT || 8000, () => {
            console.log(`SERVER IS RUNNING AT PORT : ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGO DB CONNECTION FAILED!! ", error);
    });

/* 
* Alternative approach using async/await:

import express from "express";
const app = express();

(async () => {
  try {
    //* Connect to the database using mongoose
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    //* Add error handler for the app
    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    //* Start the server and listen on the specified port
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
})();

*/
