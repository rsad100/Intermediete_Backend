//Menunjukan bahwa kita butuh express framework
const express = require("express");
const imageUpload = require("../middlewares/upload");
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");
const allowedRole = require("../middlewares/allowedRole");

const userDataRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/userData");

userDataRouter.get("/", isLogin(), allowedRole("admin", "user"), get);

userDataRouter.post(
  "/",
  isLogin(),
  allowedRole("admin", "user"),
  validate.body(
    "address",
    "display_name",
    "first_name",
    "last_name",
    "birthday",
    "gender",
    "image_user",
    "id_user"
  ),
  imageUpload.single("image_user"),
  create
);

userDataRouter.patch(
  "/:id",
  isLogin(),
  allowedRole("admin", "user"),
  validate.body(
    "address",
    "display_name",
    "first_name",
    "last_name",
    "birthday",
    "gender",
    "image_user",
    "id_user"
  ),
  imageUpload.single("image_user"),
  edit
);

userDataRouter.delete("/:id", isLogin(), allowedRole("admin", "user"), drop);

module.exports = userDataRouter;
