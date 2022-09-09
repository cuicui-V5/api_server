const mysql = require("mysql2");
const db = mysql.createPool({
    host: "180.76.112.86",
    user: "root",
    password: "23679164329",
    database: "my_db_01",
});
exports.login = (req, res) => {
    res.send("login");
    console.log("login");
};

exports.register = (req, res) => {
    res.send("register");
};

exports.query = (req, res) => {
    const queryStr = "select * from users";
    db.query(queryStr, (err, queryRes) => {
        if (err) {
            res.send(err.message);
            return;
        }
        res.send(queryRes);
    });
};
