const express = require("express");
const crypto = require("crypto");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/csp", (req, res) => {
  const nonceValue = crypto.randomBytes(16).toString("base64");
  res.header(
    "Content-Security-Policy",
    `script-src 'nonce-${nonceValue}' 'strict-dynamic'; object-src 'none'; base-uri 'none'; require-trusted-types-for 'script';`
  );

  res.render("csp", { nonce: nonceValue });
});

app.listen(port, () => {
  console.log("server is running on... ");
});
