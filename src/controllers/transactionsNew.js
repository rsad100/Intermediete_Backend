const transactionsNewRepo = require("../repo/transactionsNew");

const getLatest = async (req, res) => {
  try {
    const response = await transactionsNewRepo.getLatestTransactions();
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const GetSubById = async (req, res) => {
  try {
    const response = await transactionsNewRepo.getSubtransactionById(
      req.params
    );
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await transactionsNewRepo.getAllTransactions(req.params);
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const getById = async (req, res) => {
  try {
    const response = await transactionsNewRepo.getTransactionsById(req.params);
    res.status(200).json({
      result: response.rows,
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  try {
    const response = await transactionsNewRepo.createTransactions(req.body);
    res.response;
    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const createSub = async (req, res) => {
  try {
    // console.log(req.body);
    const response = await transactionsNewRepo.createSubtransaction(req.body);
    res.response;
    res.status(201).json({ msg: "Data Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const edit = async (req, res) => {
  try {
    const response = await transactionsNewRepo.editTransactions(
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
    const result = await transactionsNewRepo.deleteTransactions(req.params);
    res.response;
    res.status(200).json({ msg: "Data Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const transactionsController = {
  getLatest,
  create,
  createSub,
  edit,
  drop,
  getById,
  getAll,
  GetSubById,
};

module.exports = transactionsController;
