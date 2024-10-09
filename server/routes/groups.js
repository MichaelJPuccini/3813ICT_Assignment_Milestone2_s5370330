const path = require("path");
const filenameWithExtension = path.basename(__filename); // Get the filename with extension
const CONTROLLER_FILENAME = path.join(__dirname, "../controllers", filenameWithExtension); // Construct the full path to the controllers directory
const controller = require(CONTROLLER_FILENAME);

const express = require("express");

const router = express.Router();

router.get("/:id", controller.getById);
router.post("/", controller.createNewItem);
router.delete("/:id", controller.deleteById);
router.get("/mine/:userId", controller.getMyGroups);                            // Gets the groups that the user is a member of
router.get("/adduser/:groupId/:userId", controller.addUserToGroup);             // Adds a user to a group
router.get("/removeuser/:groupId/:userId", controller.removeUserFromGroup);    // Removes a user from a group
router.get("/addadmin/:groupId/:userId", controller.addAdminToGroup);          // Adds a user to a group
router.get("/removeadmin/:groupId/:userId", controller.removeAdminFromGroup);  // Removes a user from a group

module.exports = router;
