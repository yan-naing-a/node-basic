const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

//post method
router.post("/", async (req, res) => {
  const { title, introduction, body } = req.body;
  const blog = new Blog({ title, introduction, body });
  await blog.save();
  res.redirect("/blogs");
});
router.post("/:id/delete", async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.log("Error :", err);
    next();
  }
});

// get method
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("home", { blogs, title: "Home" });
});

router.get("/create", async (req, res) => {
  res.render("blogs/create", { title: "Blog Create" });
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.render("blogs/show", { blog, title: "Blog Detail" });
  } catch (err) {
    console.log("Error :", err);
    next();
  }
});

module.exports = router;
