//Menunjukan bahwa kita butuh express framework
const express = require("express");
const imageUpload = require("../middlewares/upload");
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");
const productsRouter = express.Router();
const {
  diskUpload,
  memoryUpload,
  errorHandler,
} = require("../middlewares/upload");
const cloudinaryUploader = require("../middlewares/cloudinary");
const multer = require("multer");

const { get, create, edit, drop } = require("../controllers/products");
const allowedRole = require("../middlewares/allowedRole");

//const upload = imageUpload.single("image");

productsRouter.get("/", get);

productsRouter.post(
  "/",
  // isLogin(),
  // allowedRole("admin"),
  // validate.body(
  //   "image_product",
  //   "name_product",
  //   "price",
  //   "desc_product",
  //   "size",
  //   "delivery",
  //   "starthours",
  //   "endhours",
  //   "stock",
  //   "category",
  //   "sold"
  // ),
  function (req, res, next) {
    memoryUpload.single("image_product")(req, res, function (err) {
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

productsRouter.patch(
  "/:id",
  // isLogin(),
  // allowedRole("admin"),
  // validate.body(
  //   "image_product",
  //   "name_product",
  //   "price",
  //   "desc_product",
  //   "size",
  //   "delivery",
  //   "starthours",
  //   "endhours",
  //   "stock",
  //   "category",
  //   "sold"
  // ),
  function (req, res, next) {
    memoryUpload.single("image_product")(req, res, function (err) {
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

productsRouter.delete("/:id", isLogin(), allowedRole("admin"), drop);

module.exports = productsRouter;
