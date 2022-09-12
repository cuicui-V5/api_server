// 导入 mysql 模块
const mysql = require("mysql2");

// 创建数据库连接对象
const db = mysql.createPool({
    host: "180.76.112.86",
    user: "root",
    password: "23679164329",
    database: "my_db_01",
});

// 向外共享 db 数据库连接对象
module.exports = db;
