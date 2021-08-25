const db = require("../queries");
const cryptoUtilities = require("./cryptoUtilities");

const getPrivateKey = async (merchantId) => {
  return await db.getMerchantByPrivateKey(merchantId);
};

const createMerchant = async (secureId, merchantName) => {
  let privateKey = cryptoUtilities.createPrivateKey();
  let loginId = await db.getLoginIdBySecureId(secureId);
  var success = await db.createMerchant(loginId, merchantName, privateKey);
  return {
    privateKey: privateKey,
    success: success,
    merchantName: merchantName,
  };
};

const getAllMerchantsBySecureId = async (secureId) => {  
  var merchants = await db.getAllMerchantsBySecureId(secureId);
  return {
    merchants: merchants,
    success: true,
  };
};

const deleteMerchantBySecureId = async (secureId, merchantId) => {
  var success = await db.deleteMerchantBySecureId(secureId, merchantId);
  return {
    success: success
  }
}

module.exports = {
  getPrivateKey,
  createMerchant,
  getAllMerchantsBySecureId,
  deleteMerchantBySecureId
};
