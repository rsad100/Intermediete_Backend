module.exports = {
  body: (...allowedKeys) => {
    return (req, res, next) => {
      const { body } = req;
      const sanitizedKey = Object.keys(body).filter((key) =>
        allowedKeys.includes(key)
      );

      // Apakah jumlah key di body sesuai dengan jumlah di allowedKeys
      const newBody = {};
      for (let key of sanitizedKey) {
        Object.assign(newBody, { [key]: body[key] });
      }

      // Apakah setiap value sesuai dengan tipe data yang diinginkan
      req.body = newBody;
      next();
    };
  },
};
