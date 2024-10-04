const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

require("./loadEnvironment.js");
require("express-async-errors");
// Set the port from the environment variable, default to 5050 if there is no environment variable
const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || "mongodb://localhost:27017/myFirstDatabase?retryWrites=true";
const app = express();

const CHAT_PORT = process.env.CHAT_PORT || 4200; // Get the chat server port from the environment variable, default to 4200 if there is no environment variable
// Setting up the chat server with socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ["http://localhost:4200", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
});
const socket = require('./chat-server/socket.js');
const server = require('./chat-server//listen.js');


// Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.use(cors({
  origin: ["http://localhost:4200", "http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Add the angular site to the server - Hosting the static files
app.use(express.static(path.join(__dirname, './app//dist/app/browser/'))); // Used to host static files

// Loading and Using the routes
app.use("/api/users", require("./routes/users"));
app.use("/api/groups", require("./routes/groups"));
app.use("/api/channels", require("./routes/channels"));


// Chat Server - setup socket
socket.connect(io, CHAT_PORT);
// Start chat server to listen for requests
server.listen(http, CHAT_PORT);

// Catch-all route to serve the Angular app for any other routes
app.get('*', (req, res) => {
  // console.log(path.join(__dirname, './app//dist/app/browser/index.html'))
  res.sendFile(path.join(__dirname, './app//dist/app/browser/index.html'));
});

// start the Express server
app.listen(PORT, () => {
  const serverAddress = `http://${HOST}:${PORT}`;
  console.log(`Server is running on port: ${PORT}`);
  console.log(`Server address: ${serverAddress}`);
});
