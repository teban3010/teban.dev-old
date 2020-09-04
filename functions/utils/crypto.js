const crypto = require("crypto");

const algorithm = "aes-256-ctr";
const password = process.env.CRYPTO_PASSWORD;

const encrypt = (text) => {
  const cipher = crypto.createCipher(algorithm, password);
  let crypt = cipher.update(text, "utf8", "hex");
  crypt += cipher.final("hex");
  return crypt;
};

module.exports = { encrypt };
