const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

require("./loadEnvironment.js");
require("express-async-errors");

// require("dotenv").config(); // Load environment variables from .env file

// Set the port from the environment variable, default to 5050 if there is no environment variable
const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || "mongodb://localhost:27017/myFirstDatabase?retryWrites=true";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Add the angular site to the server
app.use(express.static(path.join(__dirname, './app//dist/app/browser/'))); // Used to host static files

// Loading routes
const posts = require("./routes/posts");
const products = require("./routes/products");

// Using the routes
app.use("/api/posts", posts);
app.use("/api/products", products);
app.use("/api/users", require("./routes/users"));
app.use("/api/groups", require("./routes/groups"));
app.use("/api/channels", require("./routes/channels"));

// Catch-all route to serve the Angular app for any other routes
app.get('*', (req, res) => {
  // console.log(path.join(__dirname, './app//dist/app/browser/index.html'))
  res.sendFile(path.join(__dirname, './app//dist/app/browser/index.html'));
});


// start the Express server
app.listen(PORT, () => {
  // console.log(`Server is running on port: ${PORT}`);
  // const serverAddress = `http://localhost:${PORT}`;
  const serverAddress = `http://${HOST}:${PORT}`;
  console.log(`Server is running on port: ${PORT}`);
  console.log(`Server address: ${serverAddress}`);
});
