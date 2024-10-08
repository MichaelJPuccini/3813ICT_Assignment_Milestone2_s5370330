const path = require("path");
// Set the table name in the database to the filename with an s appended

const filenameWithExtension = path.basename(__filename); // Get the filename with extension
const CONTROLLER_FILENAME = path.join(__dirname, "../controllers", filenameWithExtension); // Construct the full path to the controllers directory
// console.log("Filename: ", __filename, " Trying to load model: ", path.basename(__filename, path.extname(__filename)));
// console.log("Controllers name: ", CONTROLLER_FILENAME);
// const CONTROLLER_NAME = "../controllers/products"; // Use this line instead if you want to manually set the name of the contoller file
const controller = require(CONTROLLER_FILENAME);

const express = require("express");

const router = express.Router();

// Delete unused routes
// router.get("/", controller.getAll);
// router.get("/filter", controller.getAllByFilter);
// router.get("/latest/:x", controller.getLatest);
router.post("/", controller.createNewItem);
// router.post("/multiple", controller.createNewItems);
router.get("/:id", controller.getById);
router.delete("/:id", controller.deleteById);
// router.patch("/:id", controller.updateById);
router.get("/mine/:groupId/:userId", controller.getMyChannels);          // Given the group, get the channels I'm in
router.get("/adduser/:channelId/:userId", controller.addUser);           // Adds a user to a channel
router.get("/removeuser/:channelId/:userId", controller.removeUser);     // Removes a user from a channel
router.get("/addadmin/:channelId/:userId", controller.addAdmin);         // Adds a user to a channel
router.get("/removeadmin/:channelId/:userId", controller.removeAdmin);   // Removes a user from a channel

module.exports = router;
