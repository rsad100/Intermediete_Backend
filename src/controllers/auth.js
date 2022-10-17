const authRepo = require("../repo/auth");

const login = (req, res) => {
  authRepo
    .login(req.body)
    .then((response) => {
      res.status(200).json({
        data: response,
        msg: "Login Success",
      });
    })
    .catch((objErr) => {
      const statusCode = objErr.statusCode || 500;
      res.status(statusCode).json({ msg: objErr.err.message });
    });
};

const logout = (req, res) => {
  authRepo
    .logout(req.header("x-access-token"))
    .then((response) => {
      res.status(200).json({ msg: "Logout Success" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Internal Server Error" });
    });
};

const authRouter = {
  login,
  logout,
};

module.exports = authRouter;
