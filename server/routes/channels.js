const path = require("path");
const filenameWithExtension = path.basename(__filename); // Get the filename with extension
const CONTROLLER_FILENAME = path.join(__dirname, "../controllers", filenameWithExtension); // Construct the full path to the controllers directory
const controller = require(CONTROLLER_FILENAME);

const express = require("express");

const router = express.Router();

router.post("/", controller.createNewItem);
router.get("/:id", controller.getById);
router.delete("/:id", controller.deleteById);
router.get("/mine/:groupId/:userId", controller.getMyChannels);          // Given the group, get the channels I'm in
router.get("/adduser/:channelId/:userId", controller.addUser);           // Adds a user to a channel
router.get("/removeuser/:channelId/:userId", controller.removeUser);     // Removes a user from a channel
router.get("/addadmin/:channelId/:userId", controller.addAdmin);         // Adds a user to a channel
router.get("/removeadmin/:channelId/:userId", controller.removeAdmin);   // Removes a user from a channel

module.exports = router;
