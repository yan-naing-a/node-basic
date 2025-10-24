const express = require("express");
let morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const expressLayouts = require("express-ejs-layouts");

const app = express();
app.use(express.urlencoded({ extended: true }));

// connect to mongoDB
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

//ejs view engine
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/default");
// app.use(morgan("dev"));
app.use(express.static("public"));

//post method
app.post("/blogs", async (req, res) => {
  const { title, introduction, body } = req.body;
  const blog = new Blog({ title, introduction, body });
  await blog.save();
  res.redirect("/");
});
app.post("/blogs/:id/delete", async (req, res, next) => {
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
app.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.render("home", { blogs, title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

app.get("/blogs/create", async (req, res) => {
  res.render("blogs/create", { title: "Blog Create" });
});

app.get("/single-blog/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    res.render("blogs/show", { blog, title: "Single blog" });
  } catch (err) {
    console.log("Error :", err);
    next();
  }
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});
