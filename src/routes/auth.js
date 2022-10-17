const authRouter = require("express").Router();
const validate = require("../middlewares/validate");
const authController = require("../controllers/auth");

//login
authRouter.post("/", validate.body("email", "password"), authController.login);
authRouter.delete("/logout", authController.logout);

module.exports = authRouter;
