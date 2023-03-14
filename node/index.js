const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const port = 8080;
const users = [
  { username: "jw", password: "1234" },
  { username: "guest", password: "guest123" },
];
// const me = { username: "jw", password: "1234" };

// console.log(
//   users.find((u) => u.username === me.username && u.password === me.password)
// );

const getServer = (res, path) => {
  return fs.readFile(path, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end();
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  res.statusCode = 200;
  switch (pathname) {
    case "/":
      getServer(res, path.join(__dirname, "index.html"));
      break;

    case "/admin":
      getServer(res, path.join(__dirname, "admin.html"));
      break;

    case "/hello":
      res.end(`Hello, ${query.name}!`);
      break;

    case "/login":
      const user = users.find(
        (u) => u.username === query.username && u.password === query.password
      );
      if (user) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Login successful" }));
      } else {
        res.statusCode = 401;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "Invalid username or password" }));
      }

    default:
      res.statusCode = 404;
      res.end();
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
