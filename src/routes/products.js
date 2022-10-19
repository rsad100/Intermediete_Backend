//Menunjukan bahwa kita butuh express framework
const express = require("express");
const imageUpload = require("../middlewares/upload");
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");
const productsRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/products");
const allowedRole = require("../middlewares/allowedRole");

//const upload = imageUpload.single("image");

productsRouter.get("/", get);

productsRouter.post(
  "/",
  isLogin(),
  allowedRole("admin"),
  validate.body(
    "image_product",
    "name_product",
    "price",
    "desc_product",
    "size",
    "delivery",
    "starthours",
    "endhours",
    "stock",
    "category",
    "sold"
  ),
  imageUpload.single("image_product"),
  create
);

productsRouter.patch(
  "/:id",
  isLogin(),
  allowedRole("admin"),
  validate.body(
    "image_product",
    "name_product",
    "price",
    "desc_product",
    "size",
    "delivery",
    "starthours",
    "endhours",
    "stock",
    "category",
    "sold"
  ),
  imageUpload.single("image_product"),
  edit
);

productsRouter.delete("/:id", isLogin(), allowedRole("admin"), drop);

module.exports = productsRouter;
