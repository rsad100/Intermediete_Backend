//Menunjukan bahwa kita butuh express framework
const express = require("express");
const imageUpload = require("../middlewares/upload");
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");

const promosRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/promos");
const allowedRole = require("../middlewares/allowedRole");

promosRouter.get("/", isLogin(), allowedRole("user", "admin"), get);

promosRouter.post(
  "/",
  isLogin(),
  allowedRole("admin"),
  validate.body(
    "image_promo",
    "name_promo",
    "normal_price",
    "desc_promo",
    "product_size",
    "delivery",
    "discount",
    "start_date",
    "end_date",
    "code",
    "id_product"
  ),
  imageUpload.single("image_promo"),
  create
);

promosRouter.patch(
  "/:id",
  isLogin(),
  allowedRole("admin"),
  validate.body(
    "image_promo",
    "name_promo",
    "normal_price",
    "desc_promo",
    "product_size",
    "delivery",
    "discount",
    "start_date",
    "end_date",
    "code",
    "id_product"
  ),
  imageUpload.single("image_promo"),
  edit
);

promosRouter.delete("/:id", isLogin(), allowedRole("admin"), drop);

module.exports = promosRouter;
