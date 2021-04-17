const jwt = require("jsonwebtoken");
const key = require("../config/keys");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;

    if (token == null)
      return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, key.secretOrKey);

    req.user = verified.user;

    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;
