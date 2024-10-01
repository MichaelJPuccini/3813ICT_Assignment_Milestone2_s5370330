const controller = require("../controllers/posts");
const express = require("express");

const router = express.Router();

// Delete unused routes
router.get("/", controller.getAll);
router.get("/filter", controller.getAllByFilter);
router.get("/latest/:x", controller.getLatest);
router.post("/", controller.createNewItem);
router.post("/multiple", controller.createNewItems);
router.get("/:id", controller.getById);
router.delete("/:id", controller.deleteById);
router.patch("/:id", controller.updateById);

module.exports = router;
