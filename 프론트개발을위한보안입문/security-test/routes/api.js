const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Hello" });
});
// router.post("/", (req, res) => {
//   const body = req.body;
// });

module.exports = router;
