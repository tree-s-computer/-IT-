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
  req.session.username = username;
  console.log(req.session);

  // Redirect to the CSRF verification page
  res.redirect("/csrf_test.html");
});

module.exports = router;

// 세션 데이터 저장
let sessionData = {};
