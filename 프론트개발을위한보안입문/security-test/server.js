const express = require("express");
const app = express();
const port = 3000;

const api = require("./routes/api");
const csrf = require("./routes/csrf");

app.use(express.static("public"));
//use는 Express의 미들웨어 설정을 위한 함수다.
//함수를 미들웨어에 추가하면 매번 호출하지 않아도 요청을 보낼 떄 마다 실행된다.

app.use("/api", api);
app.use("/csrf", csrf);

app.get("/", (req, res, next) => {
  res.send("topPage");
});

app.listen(port, () => {
  console.log(`Server runninhg http://localhost:${port}`);
});
