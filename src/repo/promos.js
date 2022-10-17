const postgreDb = require("../config/postgre");

const getPromos = (queryParams) => {
  return new Promise((resolve, reject) => {
    let query =
      "select id_promo, image_promo, name_promo, normal_price, desc_promo, product_size, promos.delivery, discount, start_date, end_date, code, name_product FROM promos INNER JOIN products ON promos.id_product=products.id_product";
    const values = [];
    if (queryParams.keyword) {
      query += ` where lower(name_promo) like lower('%${queryParams.keyword}%')`;
    }

    console.log(query);
    postgreDb.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createPromos = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into promos ( image_promo, name_promo, normal_price, desc_promo, product_size, delivery, discount, start_date, end_date, code, id_product) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
    const {
      name_promo,
      normal_price,
      desc_promo,
      product_size,
      delivery,
      discount,
      start_date,
      end_date,
      code,
      id_product,
    } = body;
    postgreDb.query(
      query,
      [
        image_promo,
        name_promo,
        normal_price,
        desc_promo,
        product_size,
        delivery,
        discount,
        start_date,
        end_date,
        code,
        id_product,
      ],
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

const editPromos = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update promos set ";
    if (image_promo) {
      query += `image_promo = '${image_promo}',`;
    }
    const values = [];
    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id_promo = $${idx + 2}`;
        values.push(body[key], params.id);
        return;
      }
      query += `${key} = $${idx + 1},`;
      values.push(body[key]);
    });
    console.log(query);
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

const deletePromos = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from promos where id_promo = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const promosRepo = {
  getPromos,
  createPromos,
  editPromos,
  deletePromos,
};

module.exports = promosRepo;
