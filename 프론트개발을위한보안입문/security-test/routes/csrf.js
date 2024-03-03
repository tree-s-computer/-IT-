const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
//쿠키를 읽고 쓰기위한 파서
const router = express.Router();

router.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false, //실습에서는 secure속성을 무효화하지만 실제 앱 어플리케이션에서는 해당 속성을 활성화해야한다.
      maxAge: 60 * 1000 * 5,
    },
  })
);

router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // For demonstration purposes, hardcoding username and password
  if (username !== "user1" || password !== "Password!#") {
    res.status(403).send("로그인 실패");
    return;
  }

  // Save the username in the session
  // req.session.username = username;

  sessionData = req.session;
  sessionData.username = username;

  // Redirect to the CSRF verification page
  res.redirect("/csrf_test.html");
});

router.post("/remit", (req, res) => {
  // 1. 세션에 저장된 정보에서 로그인 상태 확인
  if (!req.session.username || req.session.username !== sessionData.username) {
    res.status(403).send("로그인이 필요합니다.");
    return;
  }

  // 2. 중요한 처리를 진행 (보통은 데이터베이스 업데이트 등)
  const { to, amount } = req.body;

  // 3. 클라이언트에 응답
  res.send(`${to}에게 ${amount}원을 송금하였습니다.`);
});

module.exports = router;

// 세션 데이터 저장
let sessionData = {};
