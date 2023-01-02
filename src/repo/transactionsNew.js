const postgreDb = require("../config/postgre");

const getLatestTransactions = () => {
  return new Promise((resolve, reject) => {
    const query = "select MAX(id_transaction_new) FROM transactionsnew";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getTransactionsById = (params) => {
  return new Promise((resolve, reject) => {
    const query =
      "select transactionsnew.id_transaction_new, amount, size, id_product, id_user, status from transactionsnew INNER JOIN subtransaction ON transactionsnew.id_transaction_new = subtransaction.id_transaction_new where id_user=$1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createTransactions = (body) => {
  return new Promise((resolve, reject) => {
    const { id_user, status, id_payment } = body;
    const query =
      "insert into transactionsnew (id_user, status,id_payment) values ($1,$2,$3)";
    postgreDb.query(
      query,
      [id_user, status, id_payment],
      (err, queryResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(queryResult);
      }
    );
  });
};

const createSubtransaction = (body) => {
  return new Promise((resolve, reject) => {
    const { amount, id_transaction_new, size, id_product } = body;
    const query =
      "insert into subtransaction (amount, id_transaction_new, size, id_product) values ($1,$2,$3,$4)";
    postgreDb.query(
      query,
      [amount, id_transaction_new, size, id_product],
      (err, queryResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(queryResult);
      }
    );
  });
};

const deleteTransactions = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from transactionsnew where id_transaction_new = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const transactionsRepo = {
  getLatestTransactions,
  createTransactions,
  createSubtransaction,
  deleteTransactions,
  getTransactionsById,
};

module.exports = transactionsRepo;
