const promosRepo = require("../repo/promos");

const get = async (req, res) => {
  try {
    const response = await promosRepo.getPromos(req.query);
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    image_promo = `${req.file.version}/${req.file.public_id}.${req.file.format}`;
    const response = await promosRepo.createPromos(req.body);
    res.reponse;
    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const edit = async (req, res) => {
  try {
    image_promo = false;
    if (req.file) {
      //console.log(req.file);
      image_promo = `${req.file.version}/${req.file.public_id}.${req.file.format}`;
    }
    const response = await promosRepo.editPromos(req.body, req.params);
    res.response;
    res.status(200).json({ msg: "Data Changed Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await promosRepo.deletePromos(req.params);
    res.reponse;
    res.status(200).json({ msg: "Data Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const promosController = {
  get,
  create,
  edit,
  drop,
};

module.exports = promosController;
