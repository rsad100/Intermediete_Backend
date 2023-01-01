const express = require("express");

// import subrouter
const usersRouter = require("./users");
const productsRouter = require("./products");
const promosRouter = require("./promos");
const transactionsRouter = require("./transactions");
const authRouter = require("./auth");
const userDataRouter = require("./userData");
const transactionsNewRouter = require("./transactionsNew");
const {
  diskUpload,
  memoryUpload,
  errorHandler,
} = require("../middlewares/upload");

const mainRouter = express.Router();

const prefix = "/api/v1";

// Subrouters
mainRouter.use(`${prefix}/users`, usersRouter);
mainRouter.use(`${prefix}/products`, productsRouter);
mainRouter.use(`${prefix}/promos`, promosRouter);
mainRouter.use(`${prefix}/transactions`, transactionsRouter);
mainRouter.use(`${prefix}/auth`, authRouter);
mainRouter.use(`${prefix}/userdata`, userDataRouter);
mainRouter.use(`${prefix}/transactionsnew`, transactionsNewRouter);

mainRouter.post(`/`, diskUpload.single("image"), (req, res) => {
  res.json({ file: req.file, url: `/images/${req.file.filename}` });
});

//Homepage
mainRouter.get("/", (req, res) => {
  res.json({
    msg: "Welcome",
  });
});

module.exports = mainRouter;
