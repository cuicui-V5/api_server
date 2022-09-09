const express = require("express");
const router = express.Router();
const userHandler = require("../router_handler/userHandler");
// 注册
router.post("/register", userHandler.register);
// 登录
router.post("/login", userHandler.login);

router.post("/query", userHandler.query);

module.exports = router;
