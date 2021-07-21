const bcrypt = require("bcrypt");
var crypto = require("crypto");

const hashPasswordAsync = async (password) => {
  let hash = await bcrypt.hash(password, 10);
  return hash;
};

const createSecureId = () => {
  var token = crypto.randomBytes(40).toString("hex");
  return token;
};

const verifyPassword = async (password, hash) => {
  var same = await bcrypt.compare(password, hash);
  return same;
};

const verifySignature = async (
  merchantId,
  currentDateTime,
  orderId,
  signature
) => {
  //Make sure the current Date Time is within the last minute or so
  //Go to database and get merchant private key from merchant id
  //Sha 256 (merchantId + currentDateTime + orderId and verify it matches signature)
  //Return true if all this passes
};

module.exports = {
  hashPasswordAsync,
  createSecureId,
  verifyPassword,
  verifySignature,
};
