const jwt = require("jsonwebtoken");
const db = require("../config/postgre");

module.exports = () => {
  return (req, res, next) => {
    const token = req.header("x-access-token");
    //let found;

    //queryWhitelist = "select * from whitelist";
    //db.query(queryWhitelist, (err, res) => {
    //const tokens = res.rows;
    //let mapped = tokens.map((tokens) => tokens.token);
    //found = mapped.includes(token);
    //console.log(found);
    //});

    //console.log(found);
    //if (found == false) {
    //  return res.status(401).json({ msg: "You Have to Login First" });
    //}

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
