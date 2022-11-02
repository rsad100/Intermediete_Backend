//Menunjukan bahwa kita butuh express framework
const express = require("express");
const imageUpload = require("../middlewares/upload");
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");
const allowedRole = require("../middlewares/allowedRole");
const {
  diskUpload,
  memoryUpload,
  errorHandler,
} = require("../middlewares/upload");
const multer = require("multer");

const userDataRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/userData");

userDataRouter.get("/", get);

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
  function (req, res, next) {
    diskUpload.single("image_user")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      } else if (err) {
        return res.json({ msg: "Error Uploading File" });
      }
      next();
    });
  },
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
  function (req, res, next) {
    diskUpload.single("image_user")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      } else if (err) {
        return res.json({ msg: "Error Uploading File" });
      }
      next();
    });
  },
  edit
);

userDataRouter.delete("/:id", isLogin(), allowedRole("admin", "user"), drop);

module.exports = userDataRouter;
