const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let fileName;
  switch (req.url) {
    case "/":
      fileName = "home.html";
      break;
    case "/about":
      fileName = "about.html";
      break;
    case "/contact":
      fileName = "contact.html";
      break;
    default:
      fileName = "404.html";
      break;
  }

  res.setHeader("Content-Type", "text/html");
  fs.readFile("./views/" + fileName, (err, data) => {
    if (err) {
      console.log("An error occurred :", err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server is listening on port 3000");
});
