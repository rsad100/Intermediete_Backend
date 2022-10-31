const express = require("express");

const cors = require("cors");

// import db
const postgreDb = require("./src/config/postgre.js"); //src\config\postgre.js

const mainRouter = require("./src/routes/main");
// init express application
const server = express();

const PORT = 8080;

postgreDb
  .connect()
  .then(() => {
    // Pastikan bahwa DB sudah terkoneksi
    console.log("DB connected");

    // Untuk parsing body yang berbentuk json dan urlencoded
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(express.static("./public"));
    server.use(cors());
    // Semua request akan didelegasikan ke main router
    server.use(mainRouter);

    // Membuat server mendengarkan di port berapa
    server.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
