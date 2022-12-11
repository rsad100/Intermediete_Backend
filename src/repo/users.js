const db = require("../config/postgre");
const postgreDb = require("../config/postgre");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "select * from users";
    postgreDb.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const createUsers = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into users ( email, password, phone_number, role) values ($1,$2,$3,$4)";
    const { email, password, phone_number, role } = body;
    postgreDb.query(
      query,
      [email, password, phone_number, role],
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

const editUsers = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update users set ";
    const values = [];
    Object.keys(body).forEach((key, idx, array) => {
      if (idx === array.length - 1) {
        query += `${key} = $${idx + 1} where id_user = $${idx + 2}`;
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

const deleteUsers = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from users where id_user = $1";
    postgreDb.query(query, [params.id], (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const registerUsers = (body) => {
  return new Promise((resolve, reject) => {
    const { phone_number, email, password } = body;

    // validasi (email tidak boleh duplikat)
    // 1. cek apakah email di body ada di db
    // 2. kalo ada, maka reject status 400 bad request
    // 3. kalo tidak, lanjut hash
    // Hash Password

    queryPhone = "select phone_number from users";
    db.query(queryPhone, (err, result) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      //Check Phone Number
      const phoneNumbers = result.rows;
      let mapped_phone = phoneNumbers.map(
        (phoneNumbers) => phoneNumbers.phone_number
      );
      //console.log(mapped_phone);
      let found_phone = mapped_phone.includes(phone_number);
      //console.log(found_phone);
      if (!found_phone) {
        query = "SELECT email FROM users";
        db.query(query, (err, result) => {
          if (err) {
            console.log(err);
            return reject(err);
          }

          //Check email
          const emails = result.rows;
          let mapped = emails.map((emails) => emails.email);
          let found = mapped.includes(email);
          console.log(found);
          if (!found) {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
              if (err) {
                console.log(err);
                return reject(err);
              }
              const query =
                "INSERT INTO users (phone_number, email, password, role) VALUES ($1, $2, $3, 'user') RETURNING id_user";
              const values = [phone_number, email, hashedPassword];
              db.query(query, values, (err, result) => {
                if (err) {
                  console.log(err);
                  return reject(err);
                }
                return resolve(result);
              });
            });
          } else {
            err = new Error("Email Already Exist");
            console.log(err);
            return reject(err);
          }
        });
      } else {
        err = new Error("Phone Number Already Exist");
        console.log(err);
        return reject(err);
      }
    });
  });
};

const editPassword = (body) => {
  return new Promise((resolve, reject) => {
    //console.log(token);

    jwt.verify(
      token,
      process.env.SECRET_KEY,
      { issuer: process.env.ISSUER },
      (err, decodedPayload) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ msg: err.message, data: null });
        }

        // Payload akan ditempel ke object request
        id = decodedPayload.user_id;
      }
    );
    //console.log(id);

    const { old_password, new_password } = body;
    const getPwdQuery = "SELECT password FROM users WHERE id_user = $1";
    const getPwdValues = [id];
    db.query(getPwdQuery, getPwdValues, (err, response) => {
      if (err) {
        console.log(err);
        return reject({ err });
      }
      const hashedPassword = response.rows[0].password;
      bcrypt.compare(old_password, hashedPassword, (err, isSame) => {
        if (err) {
          console.log(err);
          return reject({ err });
        }
        if (!isSame)
          return reject({
            err: new Error("Old Password is Wrong"),
            statusCode: 403,
          });
        bcrypt.hash(new_password, 10, (err, newHashedPassword) => {
          if (err) {
            console.log(err);
            return reject({ err });
          }
          const editPwdQuery =
            "UPDATE users SET password = $1 WHERE id_user = $2";
          const editPwdValues = [newHashedPassword, id];
          db.query(editPwdQuery, editPwdValues, (err, response) => {
            if (err) {
              console.log(err);
              return reject({ err });
            }
            return resolve(response);
          });
        });
      });
    });
  });
};

const usersRepo = {
  getUsers,
  createUsers,
  editUsers,
  deleteUsers,
  registerUsers,
  editPassword,
};

module.exports = usersRepo;
