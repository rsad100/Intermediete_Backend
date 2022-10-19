const productsRepo = require("../repo/products");

const get = async (req, res) => {
  try {
    const response = await productsRepo.getProducts(req.query);
    res.status(200).json({
      page_number: req.query.page,
      page_size: req.query.limit,
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    //console.log(req.file);
    console.log(req.file);
    if (req.file) {
      image_product = `/images/${req.file.filename}`;
    }
    //console.log(image_product);
    const response = await productsRepo.createProducts(req.body);
    res.response;
    res.status(201).json({
      result: "Data Created Successfully",
      file: req.file,
      url: image_product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const edit = async (req, res) => {
  try {
    new_image = false;
    if (req.file) {
      console.log(req.file);
      new_image = `/images/${req.file.filename}`;
    }
    const response = await productsRepo.editProducts(req.body, req.params);
    res.response;
    res.status(200).json({ msg: "Data Changed Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await productsRepo.deleteProducts(req.params);
    res.reponse;
    res.status(200).json({ msg: "Data Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const productsController = {
  get,
  create,
  edit,
  drop,
};

module.exports = productsController;
