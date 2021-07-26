const db = require("../queries");
const crypto = require("./cryptoUtilities");

const getPrivateKey = async (merchantId) => {
  return await db.getMerchantByPrivateKey(merchantId);
};

const createMerchant = async (loginId, merchantName) => {
  let privateKey = cryptoUtilities.createPrivateKey();
  await db.createMerchant(loginId, merchantName, privateKey);
  return privateKey;
};

module.exports = {
  getPrivateKey,
  createMerchant,
};
