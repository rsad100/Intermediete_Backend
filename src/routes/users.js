//Menunjukan bahwa kita butuh express framework
const express = require("express");

const usersRouter = express.Router();

const { get, create, edit, drop } = require("../controllers/users");

usersRouter.get("/", get);

usersRouter.post("/", create);

usersRouter.patch("/:id", edit);

usersRouter.delete("/:id", drop);

module.exports = usersRouter;
