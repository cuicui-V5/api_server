const express = require("express");
const router = express.Router();
const userHandler = require("../router_handler/user");

//验证表单的中间件
const expressJoi = require("@escook/express-joi");
const { reg_login_schema } = require("../schema/user.js");

// 注册
// router.post("/register", userHandler.register);
router.post("/register", expressJoi(reg_login_schema), userHandler.register);
// 登录
router.post("/login", expressJoi(reg_login_schema), userHandler.login);

module.exports = router;
