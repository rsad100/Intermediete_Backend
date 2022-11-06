//Menunjukan bahwa kita butuh express framework
const express = require("express");
const imageUpload = require("../middlewares/upload");
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");
const {
  diskUpload,
  memoryUpload,
  errorHandler,
} = require("../middlewares/upload");
const multer = require("multer");
const cloudinaryUploader = require("../middlewares/cloudinary");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");
const allowedRole = require("../middlewares/allowedRole");

promosRouter.get("/", get);

promosRouter.post(
  "/",
  // isLogin(),
  // allowedRole("admin"),
  // validate.body(
  //   "image_promo",
  //   "name_promo",
  //   "normal_price",
  //   "desc_promo",
  //   "product_size",
  //   "delivery",
  //   "discount",
  //   "start_date",
  //   "end_date",
  //   "code",
  //   "id_product"
  // ),
  function (req, res, next) {
    memoryUpload.single("image_promo")(req, res, function (err) {
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
  create
);

promosRouter.patch(
  "/:id",
  // isLogin(),
  // allowedRole("admin"),
  // validate.body(
  //   "image_promo",
  //   "name_promo",
  //   "normal_price",
  //   "desc_promo",
  //   "product_size",
  //   "delivery",
  //   "discount",
  //   "start_date",
  //   "end_date",
  //   "code",
  //   "id_product"
  // ),
  function (req, res, next) {
    memoryUpload.single("image_promo")(req, res, function (err) {
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

promosRouter.delete("/:id", isLogin(), allowedRole("admin"), drop);

module.exports = promosRouter;
