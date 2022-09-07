// 导入
const express = require("express");
// 创建服务器实例
const app = express();
// 导入cors
const cors = require("cors");

//导入路由
const userRouter = require("./router/user");
//  配置中间件
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

//使用路由
app.use("/api", userRouter);
//开启服务器
app.listen(80, () => {
    console.log("server started at http://127.0.0.1");
});
