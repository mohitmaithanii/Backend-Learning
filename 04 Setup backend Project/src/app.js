import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express(); // Initialize an Express.js application

// Enable Cross-Origin Resource Sharing (CORS) with credentials
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Parse JSON request bodies with a limit of 16KB
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded request bodies with a limit of 16KB and extended syntax
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse and serialize cookies
app.use(cookieParser());

export { app };
