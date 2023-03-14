const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const port = 8080;

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  switch (pathname) {
    case "/":
      fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end();
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
      break;

    case "/admin":
      fs.readFile(path.join(__dirname, "admin.js"), (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end();
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
      break;

    case "/hello":
      res.end(`Hello, ${query.name}!`);
      break;

    default:
      res.statusCode = 404;
      res.end();
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

fs.readFile(filePath, (err, data) => {
  if (err) {
    res.statusCode = 500;
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end(data);
});
