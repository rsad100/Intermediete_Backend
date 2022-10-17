const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/postgre");

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;

    // 1. Apakah ada email yang bersangkutan di DB
    const getPasswordbyEmailQuery =
      "SELECT id_user, email, password, role FROM users WHERE email = $1";
    const getPasswordByEmailValues = [email];
    db.query(
      getPasswordbyEmailQuery,
      getPasswordByEmailValues,
      (err, response) => {
        if (err) {
          console.log(err);
          return reject({ err });
        }
        if (response.rows.length === 0)
          return reject({
            err: new Error("Email/Password is wrong"),
            statusCode: 401,
          });

        // 2. Apakah password yang tertera di DB sama dengan yang di input
        const hashedPassword = response.rows[0].password;
        bcrypt.compare(password, hashedPassword, (err, isSame) => {
          if (err) {
            console.log(err);
            return reject({ err });
          }
          if (!isSame)
            return reject({
              err: new Error("Email/Password is Wrong"),
              statusCode: 401,
            });

          // 3. proses login => create jwt => return jwt to user
          const payload = {
            user_id: response.rows[0].id_user,
            email,
            role: response.rows[0].role,
          };
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: "15m",
              issuer: process.env.ISSUER,
            },
            (err, token) => {
              if (err) {
                console.log(err);
                return reject({ err });
              }
              //console.log(typeof token);
              whitelistQuery = `insert into whitelist (token) values('${token}')`;
              //console.log(whitelistQuery);
              db.query(whitelistQuery, (err, res) => {});
              return resolve({ token });
            }
          );
        });
      }
    );
  });
};

const logout = (header) => {
  return new Promise((resolve, reject) => {
    //console.log(header);
    query = `delete from whitelist where token = '${header}'`;
    db.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

const authRepo = {
  login,
  logout,
};

module.exports = authRepo;
