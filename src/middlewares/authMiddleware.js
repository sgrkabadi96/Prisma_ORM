const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/jwtUtils");
const secretKey = "Sagar Kabadi";

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token)
    return res.status(401).send({ error: "Access denied. No token provided." });

  try {
    const a = token.split(" ")[1];
    const decoded = verifyToken(a);
    req.body.user = decoded;

    next();
  } catch (error) {
    res.status(400).send({ error: "Invalid token." });
  }
}

module.exports = authenticateToken;
