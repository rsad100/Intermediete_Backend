//Menunjukan bahwa kita butuh express framework
const express = require("express");
const transactionsRouter = express.Router();
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");
const allowedRole = require("../middlewares/allowedRole");
const {
  get,
  getById,
  create,
  edit,
  drop,
} = require("../controllers/transactions");

transactionsRouter.get("/", get);
transactionsRouter.get("/:id", getById);

//transactionsRouter.post("/", isLogin(), create);
transactionsRouter.post(
  "/",
  // isLogin(),
  // allowedRole("user", "admin"),
  // validate.body("id_product", "amount", "id_user", "id_payment"),
  create
);

transactionsRouter.patch(
  "/:id",
  // isLogin(),
  // allowedRole("user", "admin"),
  // validate.body("id_product", "amount", "id_user", "id_payment"),
  edit
);

transactionsRouter.delete(
  "/:id",
  isLogin(),
  allowedRole("user", "admin"),
  drop
);

module.exports = transactionsRouter;
