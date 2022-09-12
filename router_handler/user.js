const db = require("../router/db");
const bcrypt = require("bcryptjs");
// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");

const config = require("../config");
exports.login = (req, res) => {
    // 检测表单数据是否合法
    // 根据用户名查询用户的数据
    // 判断用户输入的密码是否正确
    // 生成 JWT 的 Token 字符串
    console.log("login");
    const userinfo = req.body;
    const sql = "select * from users where username=?";
    db.query(sql, userinfo.username, function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.cc(err);
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc("登录失败！");

        //比较密码
        const compareRes = bcrypt.compareSync(userinfo.password, results[0].password);
        if (!compareRes) {
            return res.cc("登陆失败");
        }
        // 生成JWT字符串
        const user = { ...results[0], password: "", user_pic: "" };
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: "10h",
        });
        res.send({ status: 0, message: "登陆成功", token: tokenStr });
    });
};

exports.register = (req, res) => {
    // 检测表单数据是否合法;
    // 检测用户名是否被占用;
    // 对密码进行加密处理;
    // 插入新用户;
    const userinfo = req.body;
    if (!userinfo.username || !userinfo.password) {
        res.cc("用户名密码为空");
        return;
    }
    const sql = "select * from users where username = ?";

    db.query(sql, userinfo.username, (err, result) => {
        if (err) {
            res.send({ status: 1, message: err.message });
            return;
        }
        // 如果用户名被占用
        if (result.length > 0) {
            res.cc("用户名被占用");
            return;
        }

        userinfo.password = bcrypt.hashSync(userinfo.password, 10);
        const sql = "insert into users set ?";
        db.query(
            sql,
            { username: userinfo.username, password: userinfo.password },
            function (err, results) {
                // 执行 SQL 语句失败
                if (err) return res.send({ status: 1, message: err.message });
                // SQL 语句执行成功，但影响行数不为 1
                if (results.affectedRows !== 1) {
                    return res.send({ status: 1, message: "注册用户失败，请稍后再试！" });
                }
                // 注册成功
                res.send({ status: 0, message: "注册成功！" });
            }
        );
    });
};
