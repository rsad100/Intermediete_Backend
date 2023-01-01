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
      "select users.id_user,id_transaction, products.image_product, products.name_product, products.price, amount, users.address, phone_number, status, transactions.size from transactions INNER JOIN products ON transactions.id_product=products.id_product INNER JOIN users ON transactions.id_user=users.id_user where transactions.id_user=$1";
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
    const { id_user, status } = body;
    const query =
      "insert into transactionsnew (id_user, status) values ($1,$2)";
    postgreDb.query(query, [id_user, status], (err, queryResult) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(queryResult);
    });
  });
};

const createSubtransaction = (body) => {
  return new Promise((resolve, reject) => {
    const { amount, id_payment, id_transaction_new, size } = body;
    const query =
      "insert into subtransaction (amount, id_payment,id_transaction_new, size) values ($1,$2,$3,$4)";
    postgreDb.query(
      query,
      [amount, id_payment, id_transaction_new, size],
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
