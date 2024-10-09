const path = require("path");
// Set the table name in the database to the filename with an s appended

const filenameWithExtension = path.basename(__filename); // Get the filename with extension
const CONTROLLER_FILENAME = path.join(__dirname, "../controllers", filenameWithExtension); // Construct the full path to the controllers directory
const controller = require(CONTROLLER_FILENAME);

const express = require("express");

const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.createNewItem);
router.get("/:id", controller.getById);
router.delete("/:id", controller.deleteById);
router.patch("/:id", controller.updateById);
router.post("/login", controller.login);

module.exports = router;
