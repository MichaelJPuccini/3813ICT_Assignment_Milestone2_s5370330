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
router.get("/:id", controller.getById);
router.post("/", controller.createNewItem);
// router.patch("/:id", controller.updateById);
router.delete("/:id", controller.deleteById);
// router.get("/filter", controller.getAllByFilter);
// router.get("/latest/:x", controller.getLatest);
// router.post("/multiple", controller.createNewItems);
router.get("/mine/:userId", controller.getMyGroups);                            // Gets the groups that the user is a member of
router.get("/adduser/:groupId/:userId", controller.addUserToGroup);             // Adds a user to a group
router.get("/removeuser/:groupId/:userId", controller.removeUserFromGroup);    // Removes a user from a group
router.get("/addadmin/:groupId/:userId", controller.addAdminToGroup);          // Adds a user to a group
router.get("/removeadmin/:groupId/:userId", controller.removeAdminFromGroup);  // Removes a user from a group

module.exports = router;
