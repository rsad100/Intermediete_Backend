const transactionsRepo = require("../repo/transactions");

const get = async (req, res) => {
  try {
    const response = await transactionsRepo.getTransactions(req.params);
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const response = await transactionsRepo.createTransactions(req.body);
    res.response;
    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const edit = async (req, res) => {
  try {
    const response = await transactionsRepo.editTransactions(
      req.body,
      req.params
    );
    res.response;
    res.status(200).json({ msg: "Data Changed Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const drop = async (req, res) => {
  try {
    const result = await transactionsRepo.deleteTransactions(req.params);
    res.response;
    res.status(200).json({ msg: "Data Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const transactionsController = {
  get,
  create,
  edit,
  drop,
};

module.exports = transactionsController;
