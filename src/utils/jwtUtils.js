const jwt = require("jsonwebtoken");

const secretKey = "Sagar Kabadi"; // Replace with a secure secret key

function generateToken(user) {
  // Generate a JWT token with user payload and secret key
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
}

function verifyToken(token) {
  // Verify the JWT token
  return jwt.verify(token, secretKey);
}

module.exports = {
  generateToken,
  verifyToken,
};
