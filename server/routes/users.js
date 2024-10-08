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
router.get("/", controller.getAll);
// router.get("/filter", controller.getAllByFilter);
// router.get("/latest/:x", controller.getLatest);
router.post("/", controller.createNewItem);
// router.post("/multiple", controller.createNewItems);
router.get("/:id", controller.getById);
router.delete("/:id", controller.deleteById);
router.patch("/:id", controller.updateById);
router.post("/login", controller.login);
// router.post("/logout", controller.logout);
// router.post("/authtoid", controller.authToId);

module.exports = router;
