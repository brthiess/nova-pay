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

const createPrivateKey = () => {
  var privateKey = crypto.randomBytes(40).toString("hex");
  return "pk" + privateKey;
};

const verifyPassword = async (password, hash) => {
  var same = await bcrypt.compare(password, hash);
  return same;
};

const verifySignature = async (merchantId, orderId, signature) => {
  //Go to database and get merchant private key from merchant id
  merchantUtilities.getPrivateKey(merchantId);
  //Sha 256 (merchantId + orderId and verify it matches signature)
  //Return true if all this passes
};

module.exports = {
  hashPasswordAsync,
  createSecureId,
  verifyPassword,
  verifySignature,
  createPrivateKey,
};
