const express = require("express");
const crypto = require("crypto");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "ejs");
// Express는 기본적으로 "views"라는 폴더를 템플릿 파일의 기본 디렉토리로 간주한다.

app.use(express.static(path.join(__dirname, "public")));
// Serve static files from the 'public' directory

app.get("/csp", (req, res) => {
  const nonceValue = crypto.randomBytes(16).toString("base64");
  res.header(
    "Content-Security-Policy",
    `script-src 'nonce-${nonceValue}' 'strict-dynamic'`
  );

  res.render("csp", { nonce: nonceValue });
});

app.listen(port, () => {
  console.log("server is running on... ");
});
