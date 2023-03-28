const express = require("express");
const app = express();
const fs = require("fs");

// URL Routing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET URL 인자 받아오기
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID is ${userId}`);
});

// fs 모듈을 사용해서 경로 별 파일 지정하기
app.get("/file/:name", (req, res) => {
  const fileName = req.params.name;
  fs.readFile(`${__dirname}/${fileName}`, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

// JSON객체를 이용한 POST방식 로그인 기능 구현
app.use(express.json());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // 로그인 로직 구현

  res.send("Login successful!");
});

// REST API 규칙에 맞게 CRUD제작하기
// Create
app.post("/users", (req, res) => {
  // 사용자 생성 로직 구현
});

// Read
app.get("/users/:id", (req, res) => {
  // 특정 사용자 정보 가져오기 로직 구현
});

// Update
app.put("/users/:id", (req, res) => {
  // 사용자 정보 수정 로직 구현
});

// Delete
app.delete("/users/:id", (req, res) => {
  // 사용자 삭제 로직 구현
});

app.get("/users/:userId/", function (req, res) {
  const userId = req.params.userId;
  res.send(`User ID is ${userId}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
