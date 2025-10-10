const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  fs.readFile("./views/home.html", (err, data) => {
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
