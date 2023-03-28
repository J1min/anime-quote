const express = require("express");
const mysql = require("mysql2");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port: "3306",
  database: "my_db",
});

app.get("/", () => {
  res.send("안녕하세용");
});

app.get("/user", (req, res) => {
  const sql = "select * from NewTable";
  connection.query(sql, (err, results) => {
    console.log(results);
  });
});

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});
