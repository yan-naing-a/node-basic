const express = require("express");
let morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/Blog");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

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

app.get("/add-blog", async (req, res) => {
  const blog = new Blog({
    title: "My Blog 1",
    introduction: "My Blog intro 1",
    body: "My Blog body 1",
  });

  await blog.save();
  res.send("Blog saved");
});

/* 
//npm package behind the senses

const logger = (env) => {
  return (req, res, next) => {
    if (env === "dev") {
      console.log(`${req.method} ${req.originalUrl} - -`);
    }
    next();
  };
};
app.use(logger("dev")); */

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const books = [
    {
      title: "The Pragmatic Programmer",
      price: 39.99,
      introduction:
        "A classic book on software engineering and best practices.",
    },
    {
      title: "Clean Code",
      price: 34.95,
      introduction:
        "A handbook of agile software craftsmanship by Robert C. Martin.",
    },
    {
      title: "JavaScript: The Good Parts",
      price: 29.99,
      introduction:
        "Douglas Crockford's guide to the best features of JavaScript.",
    },
  ];

  res.render("home", { books, title: "Home" });
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
