const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
// Express는 기본적으로 "views"라는 폴더를 템플릿 파일의 기본 디렉토리로 간주힌다.

app.get("/csp", (req, res) => {
  res.header("Content-Security-Policy", "script-src 'self'");
  res.render("csp");
});

app.listen(port, () => {
  console.log("server is running on... ");
});
