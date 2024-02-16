const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res, next) => {
  res.send("topPage");
});

app.listen(port, () => {
  console.log(`Server runninhg http://localhost:${port}`);
});
