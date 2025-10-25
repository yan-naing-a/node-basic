const express = require("express");
let morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");
const expressLayouts = require("express-ejs-layouts");
const blogRouter = require("./routes/blogRoutes");

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

app.get("/", async (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact" });
});

app.use("/blogs", blogRouter);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});
