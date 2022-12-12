//Menunjukan bahwa kita butuh express framework
const express = require("express");
const usersController = require("../controllers/users");
const usersRouter = express.Router();
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");
const allowedRole = require("../middlewares/allowedRole");
const {
  diskUpload,
  memoryUpload,
  errorHandler,
} = require("../middlewares/upload");
const multer = require("multer");
const cloudinaryUploader = require("../middlewares/cloudinary");

const { get, create, edit, drop } = require("../controllers/users");

usersRouter.get("/:id", get);
usersRouter.post("/register", usersController.register);

usersRouter.patch(
  "/changepassword",
  isLogin(),
  //allowedRole("user", "admin"),
  //validate.body("old_password", "new_password", "user_id"),
  usersController.editPassword
);

usersRouter.post(
  "/",
  isLogin(),
  allowedRole("admin"),
  validate.body("email", "password", "phone_number", "role"),
  create
);

usersRouter.patch(
  "/:id",
  // isLogin(),
  // allowedRole("admin"),
  // validate.body("email", "password", "phone_number", "role"),
  function (req, res, next) {
    memoryUpload.single("image_user")(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
      } else if (err) {
        return res.json({ msg: "Error Uploading File" });
      }
      next();
    });
  },
  cloudinaryUploader,
  edit
);
usersRouter.delete("/:id", isLogin(), allowedRole("admin"), drop);

module.exports = usersRouter;
