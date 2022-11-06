const productsRepo = require("../repo/products");
const db = require("../config/postgre");

const get = async (req, res) => {
  try {
    const response = await productsRepo.getProducts(req.query);
    //console.log(typeof req.query.page);

    const total = () => {
      return new Promise((resolve, reject) => {
        queryTotal = "select count(id_product) from products";
        db.query(queryTotal, (err, res) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        });
      });
    };

    totalData = await total();
    //console.log(totalData.rows[0].count);

    totalPage = totalData.rows[0].count / req.query.limit;
    //console.log(Math.ceil(totalPage));

    let next_page = Number(req.query.page) + 1;
    let previous_page = Number(req.query.page) - 1;

    next = `/api/v1/products/?page=${next_page}&limit=${req.query.limit}`;
    previous = `/api/v1/products/?page=${previous_page}&limit=${req.query.limit}`;
    if (req.query.filter) {
      previous += `&filter=${req.query.filter}`;
      next += `&filter=${req.query.filter}`;
    }
    if (req.query.keyword) {
      previous += `&keyword=${req.query.keyword}`;
      next += `&keyword=${req.query.keyword}`;
    }
    if (req.query.sort) {
      previous += `&sort=${req.query.sort}`;
      next += `&sort=${req.query.sort}`;
    }
    if (previous_page <= 0) {
      previous = undefined;
    }

    //console.log(req.query.keyword);
    res.status(200).json({
      total_data: totalData.rows[0].count,
      total_page: Math.ceil(totalPage),
      next,
      previous,
      result: response.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    //console.log(req.file);
    console.log(req.file);
    if (req.file) {
      image_product = `/${req.file.public_id}.${req.file.format}`;
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
      new_image = `${req.file.version}/${req.file.public_id}.${req.file.format}`;
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
