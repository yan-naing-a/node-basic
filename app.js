const express = require("express");
let morgan = require("morgan");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
