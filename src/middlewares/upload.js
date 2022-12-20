const multer = require("multer");
const path = require("path");
const { callbackify } = require("util");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    //console.log(file);
    const suffix = Date.now();
    const ext = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${suffix}${ext}`;
    cb(null, fileName);
  },
});

const diskUpload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: { fileSize: 5000000 }, //Limit 1MB
});

const memoryStorage = multer.memoryStorage();

const memoryUpload = multer({
  storage: memoryStorage,
  limits: { fileSize: 1000000 }, //Limit 1MB
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
});

const errorHandler = (err, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({ status: "Upload Error", msg: err.message });
  }
  if (err) {
    return res
      .status(500)
      .json({ status: "Internal Server Error", msg: err.message });
  }
  console.log("Upload Success");
  next();
};

module.exports = { diskUpload, memoryUpload, errorHandler };
