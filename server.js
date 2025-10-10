const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<h1>I am testing node js server now</h1>");
  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("server is listening on port 3000");
});
