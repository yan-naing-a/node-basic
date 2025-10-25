const express = require("express");
const Blog = require("../models/Blog");
const BlogController = require("../controllers/BlogController");

const router = express.Router();

//post method
router.post("/", BlogController.store);
router.post("/:id/delete", BlogController.destroy);
// get method
router.get("/", BlogController.index);
router.get("/create", BlogController.create);
router.get("/:id", BlogController.show);

module.exports = router;
