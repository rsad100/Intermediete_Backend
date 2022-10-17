const postgreDb = require("../config/postgre");

const getUserData = () => {
  return new Promise((resolve, reject) => {
    let query = "select * FROM userdata";
    //console.log(query);
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createUserData = (body) => {
  return new Promise((resolve, reject) => {
    //console.log(body);
    const query =
      "insert into userdata ( address, display_name, first_name, last_name, birthday, gender, image_user, id_user ) values ($1,$2,$3,$4,$5,$6,$7,$8)";
    const {
      address,
      display_name,
      first_name,
      last_name,
      birthday,
      gender,
      id_user,
    } = body;
    postgreDb.query(
      query,
      [
        address,
        display_name,
        first_name,
        last_name,
        birthday,
        gender,
        image_user,
        id_user,
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

const editUserData = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update userdata set ";
    if (image_user) {
      query += `image_user = '${image_user}',`;
    }
    const values = [];
    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id_userdata = $${idx + 2}`;
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

const deleteUserData = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from userdata where id_userdata = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const userDataRepo = {
  getUserData,
  createUserData,
  editUserData,
  deleteUserData,
};

module.exports = userDataRepo;
