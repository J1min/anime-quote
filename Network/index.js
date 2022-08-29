const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/shop", (req, res) => {
  res.sendFile(__dirname + "/shop.html");
});

app.get("/pet", (req, res) => {
  res.sendFile(__dirname + "/pet.html");
});

app.get("/um", (req, res) => {
  res.sendFile(__dirname + "/um.html");
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
