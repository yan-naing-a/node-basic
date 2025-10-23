const express = require("express");
let morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const expressLayouts = require("express-ejs-layouts");

const app = express();
app.use(express.urlencoded({ extended: true }));

const mongoUrl =
  "mongodb+srv://yannaingaung:test1234@cluster0.ftvrb2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("connect to mongoDb");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/default");

// app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/blogs/create", async (req, res) => {
  res.render("blogs/create", { title: "Blog Create" });
});
app.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("home", { blogs, title: "Home" });
});
app.get("/single-blog", async (req, res) => {
  const blog = await Blog.findById("68f8d17c9b433efb1a34792a");
  res.json(blog);
});

app.post("/blogs", async (req, res) => {
  const { title, introduction, body } = req.body;
  const blog = new Blog({ title, introduction, body });
  await blog.save();
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});
