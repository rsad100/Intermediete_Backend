const jwt = require("jsonwebtoken");
const db = require("../config/postgre");

module.exports = () => {
  return async (req, res, next) => {
    const token = req.header("x-access-token");
    //let found;

    const whitelist = () => {
      return new Promise((resolve, reject) => {
        queryWhitelist = "select * from whitelist";
        db.query(queryWhitelist, (err, res) => {
          if (err) {
            return reject(err);
          }
          const tokens = res.rows;
          let mapped = tokens.map((tokens) => tokens.token);
          found = mapped.includes(token);
          resolve(found);
        });
      });
    };

    response = await whitelist();
    if (response == false) {
      return res.status(401).json({ msg: "You Have to Login First" });
    }

    if (!token)
      return res
        .status(401)
        .json({ msg: "You Have to Login First", data: null });

    // verifikasi
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
        req.userPayload = decodedPayload;
        //console.log(decodedPayload);
        next();
      }
    );
  };
};
