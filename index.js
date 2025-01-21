const express = require("express");
const bodyParser = require("body-parser");
const database = require("./database");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("demos"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.redirect("/queryform.html");
});

app.get("/querys", (req, res) => {
  res.json({
    result: database.getquerys(),
    success: true,
  });
});

app.post("/querys", (req, res) => {
  let fullname = req.body.fullname;
  let mobileno = req.body.mobileno;
  let message = req.body.message;

  if (fullname == "" || mobileno == "" || message == "") {
    let payload = {
      message: "Please provide fullname, mobileno and message!!",
      success: true,
    };
    res.status(400).json(payload);
  } else {
    database.addquery(fullname, mobileno, message);

    let payload = {
      message: "Thank you for your message",
      success: true,
    };
    res.status(200).json(payload);
  }
});

app.listen(PORT, () => {
  console.log("Express server start at port: ", PORT);
  console.log(`http://localhost:${PORT}`);
});