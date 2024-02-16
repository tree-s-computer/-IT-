const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());

  console.log(req.query);
  let message = req.query.message;
  const lang = req.headers["x-lang"];

  console.log(message);

  if (message === "") {
    res.status(400);
    if (lang === "en") {
      message = "message is empty";
    } else {
      message = "message 값이 비었음.";
    }
    message = "message값이 비었어요.";
  }
  res.send({ message });
});

// const res = await fetch("http://localhost:3000/api?message=", {
//   headers: { "X-Lang": "en" },
// });

router.post("/", (req, res) => {
  const body = req.body;
});

module.exports = router;
