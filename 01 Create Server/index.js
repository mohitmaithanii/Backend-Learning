// Import the required modules
require("dotenv").config();
const express = require("express");

// Create an instance of express
const app = express();

// Set the port number
const port = 3000;

// Define a route for the root URL ("/") and send "Hello World!" as the response
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Define a route for the "/twitter" URL and send "mohitmaithaniii" as the response
app.get("/twitter", (req, res) => {
	res.send("mohitmaithaniii");
});

// Define a route for the "/login" URL and send a login prompt as the response
app.get("/login", (req, res) => {
	res.send("<h1> please login at chai aur code</h1>");
});

// Define a route for the "/youtube" URL and send "Chai aur code" as the response
app.get("/youtube", (req, res) => {
	res.send("Chai aur code");
});

// Start the server and listen on the specified port
app.listen(process.env.PORT, () => {
	console.log(`Example app listening on port ${port}`);
});
