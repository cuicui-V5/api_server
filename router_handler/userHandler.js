/**
 *
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.login = (req, res) => {
    res.send("login");
    console.log("login");
};

exports.register = (req, res) => {
    res.send("register");
};
