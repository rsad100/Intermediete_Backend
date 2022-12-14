const postgreDb = require("../config/postgre");

const getTransactions = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select users.id_user,id_transaction, products.image_product, products.name_product, products.price, amount, users.address, phone_number, status, transactions.size from transactions INNER JOIN products ON transactions.id_product=products.id_product INNER JOIN users ON transactions.id_user=users.id_user";
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
    const { id_product, amount, id_user, id_payment, status, size } = body;
    const query =
      "insert into transactions ( id_product, amount, id_user, id_payment, status, size ) values ($1,$2,$3,$4,$5,$6)";
    postgreDb.query(
      query,
      [id_product, amount, id_user, id_payment, status, size],
      (err, queryResult) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(queryResult);
        const querySum = `select sum(amount) from transactions where id_product=${id_product}`;
        postgreDb.query(querySum, (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(res.rows[0].sum);
          total = res.rows[0].sum;
          const queryUpdate = `update products set sold = ${total} where id_product=${id_product}`;
          postgreDb.query(queryUpdate, (err, res) => {
            if (err) {
              console.log(err);
              return reject(err);
            }
          });
        });
      }
    );
  });
};

const editTransactions = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update transactions set ";
    const values = [];
    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id_transaction = $${idx + 2}`;
        values.push(body[key], params.id);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    postgreDb
      .query(query, values)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const deleteTransactions = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from transactions where id_transaction = $1";
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
  getTransactions,
  createTransactions,
  editTransactions,
  deleteTransactions,
  getTransactionsById,
};

module.exports = transactionsRepo;
