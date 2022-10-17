const userDataRepo = require("../repo/userData");

const get = async (req, res) => {
  try {
    const response = await userDataRepo.getUserData();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    console.log(req.file);
    image_user = `/images/${req.file.filename}`;
    const response = await userDataRepo.createUserData(req.body);
    res.reponse;
    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const edit = async (req, res) => {
  try {
    image_user = false;
    if (req.file) {
      //console.log(req.file);
      image_user = `/images/${req.file.filename}`;
    }
    const response = await userDataRepo.editUserData(req.body, req.params);
    res.response;
    res.status(200).json({ msg: "Data Changed Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await userDataRepo.deleteUserData(req.params);
    res.reponse;
    res.status(200).json({ msg: "Data Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const userDataController = {
  get,
  create,
  edit,
  drop,
};

module.exports = userDataController;
