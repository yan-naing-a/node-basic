const express = require("express");

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
