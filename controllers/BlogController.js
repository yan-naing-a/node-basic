const Blog = require("../models/Blog");

const BlogController = {
  index: async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("home", { blogs, title: "Home" });
  },
  store: async (req, res) => {
    const { title, introduction, body } = req.body;
    const blog = new Blog({ title, introduction, body });
    await blog.save();
    res.redirect("/blogs");
  },
  create: async (req, res) => {
    res.render("blogs/create", { title: "Blog Create" });
  },
  show: async (req, res, next) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findById(id);
      res.render("blogs/show", { blog, title: "Blog Detail" });
    } catch (err) {
      console.log("Error :", err);
      next();
    }
  },
  destroy: async (req, res, next) => {
    try {
      const id = req.params.id;
      const blog = await Blog.findByIdAndDelete(id);
      res.redirect("/");
    } catch (err) {
      console.log("Error :", err);
      next();
    }
  },
};

module.exports = BlogController;
