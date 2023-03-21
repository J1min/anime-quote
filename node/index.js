const http = require("http");
const url = require("url");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  switch (req.method) {
    case "GET":
      if (pathname === "/") {
        root(req, res);
      } else if (pathname === "/admin") {
        admin(req, res);
      } else if (pathname.startsWith("/hello")) {
        hello(req, res);
      } else if (pathname === "/users") {
        getUsers(req, res);
      } else if (pathname === "/about") {
        about(req, res);
      } else if (pathname === "/alert") {
        alert(req, res);
      }
      break;
    case "POST":
      if (pathname === "/users") {
        createUser(req, res);
      }
      if (pathname === "/login") {
        loginUser(req, res);
      }
      break;
    case "PUT":
      if (pathname.startsWith("/users")) {
        updateUser(req, res);
      }
      break;
    case "DELETE":
      if (pathname.startsWith("/users")) {
        deleteUser(req, res);
      }
      break;
    default:
      notFound();
  }
});

const root = (req, res) => {
  res.write("Hello world!");
  res.end();
};

const admin = (req, res) => {
  res.write("Hello admin!");
  res.end();
};

const hello = (req, res) => {
  var queryData = url.parse(req.url, true).query;
  console.log(queryData.name);
  res.write(`hello, ${queryData.name}`);
  res.end();
};

const about = (req, res) => {
  fs.readFile("./index.html", (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error: ${err.code}`);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
};

const alert = (req, res) => {
  fs.readFile("./alert.html", (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error: ${err.code}`);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
};

function getUsers(req, res) {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    }
  });
}

function createUser(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const user = JSON.parse(body);

    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      } else {
        const users = JSON.parse(data);
        user.id = users[users.length - 1].id + 1;
        users.push(user);

        fs.writeFile("users.json", JSON.stringify(users), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
          } else {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(user));
          }
        });
      }
    });
  });
}

function loginUser(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const payload = JSON.parse(body);
    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      } else {
        const users = JSON.parse(data);
        const index = users.findIndex((user) => user.email === payload.email);
        if (payload.password === users[index].password) {
          res.write("로그인");
          res.end();
        } else {
          res.write("실패!");
          res.end();
        }
      }
    });
  });
}

function updateUser(req, res) {
  const id = parseInt(req.url.split("/")[2]);

  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    } else {
      let users = JSON.parse(data);
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "User not found" }));
      } else {
        let body = "";

        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const user = JSON.parse(body);
          users[index] = { ...users[index], ...user };
          fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Internal Server Error" }));
            } else {
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(users[index]));
            }
          });
        });
      }
    }
  });
}

function deleteUser(req, res) {
  const id = parseInt(req.url.split("/")[2]);

  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    } else {
      let users = JSON.parse(data);
      const index = users.findIndex((user) => user.id === id);
      if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "User not found" }));
      } else {
        users = users.filter((user) => user.id !== id);
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal Server Error" }));
          } else {
            res.writeHead(204);
            res.end();
          }
        });
      }
    }
  });
}

const notFound = (req, res) => {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
};

server.listen(8080, () => {
  console.log("listening on http://localhost:8080");
});
