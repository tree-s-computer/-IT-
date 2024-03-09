const express = require("express");
const router = express.Router();

const allowList = ["http://localhost:3000", "http://site.example:3000"];

router.use((req, res, next) => {
  const headerOrigim = req.headers.origin;
  if (headerOrigim && allowList.includes(headerOrigim))
    //요청을 허가하는 리스트 내 Origin 헤더값이 포함됐는지 체크
    res.header("Acess-Control-Allow_origin", headerOrigim);

  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Headers", "X-Token");
  }
  next();
});

router.get("/", (req, res) => {
  res.setHeader("X-Timestamp", Date.now());

  let message = req.query.message;
  const lang = req.headers["x-lang"];

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

router.get("/test", (req, res) => {
  res.send({ a: "asdffsdffdsafdfda" });
});

router.post("/", (req, res) => {
  const body = req.body;
});

module.exports = router;

// 70p ~

// const res = await fetch("http://localhost:3000/api?message=", {
//   headers: { "X-Lang": "en" },
// });

//해당 요청을 보냈을때 404 에러가 뜬다.
//api 요청에 접근할 수 있는 이유는 server.js에서 미들웨어에 api 경로를 설정해주었기 때문이다.

//test경로를 설정해줌으로써 api/test로 api를 호출할 수 있다.
