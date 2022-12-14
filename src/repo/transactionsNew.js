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

const getSubtransactionById = (params) => {
  return new Promise((resolve, reject) => {
    const query =
      "select products.name_product, products.image_product, products.price, transactionsnew.id_transaction_new, amount, subtransaction.size, subtransaction.id_product, id_user, status FROM subtransaction INNER JOIN products ON subtransaction.id_product = products.id_product INNER JOIN transactionsnew ON subtransaction.id_transaction_new = transactionsnew.id_transaction_new where subtransaction.id_transaction_new = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const getAllTransactions = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select transactionsnew.id_user, status, id_payment, display_name, id_transaction_new from transactionsnew inner join users on transactionsnew.id_user = users.id_user ";
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
      "select products.name_product, products.image_product, products.price, transactionsnew.id_transaction_new, amount, subtransaction.size, subtransaction.id_product, id_user, status FROM subtransaction INNER JOIN products ON subtransaction.id_product = products.id_product INNER JOIN transactionsnew ON subtransaction.id_transaction_new = transactionsnew.id_transaction_new where id_user=$1";
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

const markAsDone = (params) => {
  return new Promise((resolve, reject) => {
    const query =
      "update transactionsnew set status = 'Done' where id_transaction_new = $1";
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
  getAllTransactions,
  getSubtransactionById,
  markAsDone,
};

module.exports = transactionsRepo;
