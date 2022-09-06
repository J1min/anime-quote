const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/data", (req, res) => {
  var context = [
    { a: "Hello", b: "World" },
    { a: "javascript", b: "is ..." },
    { a: "web", b: "is ..." },
  ];
  res.render("data.ejs", { data: context }, (err, html) => {
    if (err) {
      console.log(err);
    }
    res.end(html);
  });
});

app.get("/contact", (req, res) => {
  res.render(
    "contact.ejs",
    { name: "juliahn", mail: "teacher006@bssm.hs.kr" },
    (err, html) => {
      if (err) {
        console.log(err);
      }
      res.end(html);
    }
  );
});
app.listen(3000, () => {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.send("this is home directory");
});
