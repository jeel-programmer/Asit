const express = require("express");
const router = express.Router();

// Get all the querys
router.get("/", (req, res) => {
  let filterresolved = req.query.resolved;
  let querys = database.getquerys();
  
  if (filterresolved) {
    querys = querys.filter(query => query.resolved == filterresolved);
  }
  
  res.json({
    result: querys,
    success: true,
  });
});

// Get a single query by id
router.get("/:id", (req, res) => {
  const queryid = req.params.id;
  const query = database.getquerybyid(queryid);

  if (query) {
    res.json({
      result: query,
      success: true,
    });
  } else {
    res.status(404).json({
      message: "Query not found!!",
      success: false,
    });
  }
});

// Create a new query
router.post("/", (req, res) => {
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

// Resolved a query
router.post("/resolve/:id", (req, res) => {
  const queryid = req.params.id;
  const query = database.resolvedquerybyid(queryid);

  if (query) {
    let payload = {
      result: query,
      success: true,
    };
    res.json(payload);
  } else {
    let payload = {
      message: "Query not found!!",
      success: false,
    };
    res.status(404).json(payload);
  }
});

module.exports = router;