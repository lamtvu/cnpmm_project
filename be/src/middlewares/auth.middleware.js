const jwtService = require("../services/jwt.service.js");
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = await jwtService.verifyToken(token, secretKey);
    req.userData = decoded;
    next();
  } catch {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports = {
  verifyToken,
};
