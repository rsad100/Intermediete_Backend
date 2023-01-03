//Menunjukan bahwa kita butuh express framework
const express = require("express");
const transactionsNewRouter = express.Router();
const isLogin = require("../middlewares/isLogin");
const validate = require("../middlewares/validate");
const allowedRole = require("../middlewares/allowedRole");
const {
  getLatest,
  getById,
  create,
  drop,
  createSub,
  getAll,
  GetSubById,
  edit,
} = require("../controllers/transactionsNew");

transactionsNewRouter.get("/", getLatest);
transactionsNewRouter.get("/all", getAll);
transactionsNewRouter.get("/:id", getById);
transactionsNewRouter.get("/sub/:id", GetSubById);

transactionsNewRouter.patch("/:id", edit);

//transactionsRouter.post("/", isLogin(), create);
transactionsNewRouter.post(
  "/",
  // isLogin(),
  // allowedRole("user", "admin"),
  // validate.body("id_product", "amount", "id_user", "id_payment"),
  create
);

transactionsNewRouter.post(
  "/createsub",
  // isLogin(),
  // allowedRole("user", "admin"),
  // validate.body("id_product", "amount", "id_user", "id_payment"),
  createSub
);

transactionsNewRouter.delete(
  "/:id",
  // isLogin(),
  // allowedRole("user", "admin"),
  drop
);

module.exports = transactionsNewRouter;
