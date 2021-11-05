const jwtService = require("../services/jwt.service.js");

const secretKey = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.slipt(" ")[1];
  try {
    const decoded = jwtService.verifyToken(token, secretKey);
    req.userData = decoded;
    next();
  } catch {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports = {
  verifyToken,
};
