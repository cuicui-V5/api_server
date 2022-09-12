// 导入
const express = require("express");
// 创建服务器实例
const app = express();
// 导入cors
const cors = require("cors");

const joi = require("joi");

const config = require("./config");

const { expressjwt } = require("express-jwt");
//导入路由
const userRouter = require("./router/user");
const userInfoRouter = require("./router/userinfo");
//  配置中间件
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        });
    };
    next();
});
app.use(
    expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
        path: [/^\/api\//],
    })
);

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

//使用路由
app.use("/api", userRouter);
app.use("/my", userInfoRouter);

//错误中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) {
        return res.cc("数据验证错误" + err.message);
    }
    if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
    console.log(err);
    res.cc("未知错误" + err);
    next();
});
//开启服务器
app.listen(80, () => {
    console.log("server started at http://127.0.0.1");
});
