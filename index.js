const express = require("express");
const mysql = require("mysql2");

const app = express();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  port: "3306",
  database: "my_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database");
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("안녕하세용");
});

app.get("/user/:id", (req, res) => {
  console.log();
  const sql = `select name from NewTable where pw='${req.params.id}'`;
  connection.query(sql, (_, results) => {
    res.send(results[0].name);
    console.log(results);
  });
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});
