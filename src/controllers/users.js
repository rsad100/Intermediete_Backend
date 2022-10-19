const usersRepo = require("../repo/users");

const get = async (req, res) => {
  try {
    const response = await usersRepo.getUsers();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const response = await usersRepo.createUsers(req.body);
    res.response;
    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const edit = async (req, res) => {
  try {
    const response = await usersRepo.editUsers(req.body, req.params);
    res.response;
    res.status(200).json({ msg: "Data Changed Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await usersRepo.deleteUsers(req.params);
    res.response;
    res.status(200).json({ msg: "Data Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const register = (req, res) => {
  const { body } = req;
  usersRepo
    .registerUsers(body)
    .then((response) => {
      res.status(201).json({
        msg: "Register Success",
        data: {
          ...response.rows[0],
          email: body.email,
          name: body.name,
        },
      });
    })
    .catch((err) => {
      //console.log(err.message);
      if (err.message == "Phone Number Already Exist") {
        res.status(400).json({ error: err.message });
      } else if (err.message == "Email Already Exist") {
        res.status(400).json({ error: err.message });
      } else {
        res
          .status(500)
          .json({ msg: "Internal Server Error", error: err.message });
      }
    });
};

const editPassword = (req, res) => {
  const { body } = req;
  token = req.header("x-access-token");
  usersRepo
    .editPassword(body)
    .then((response) => {
      res.status(200).json({
        msg: "Password has been changed",
        data: null,
      });
    })
    .catch((objErr) => {
      const statusCode = objErr.statusCode || 500;
      res.status(statusCode).json({ msg: objErr.err.message });
    });
};

const usersController = {
  get,
  create,
  edit,
  drop,
  register,
  editPassword,
};

module.exports = usersController;
