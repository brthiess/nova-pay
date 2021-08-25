var databaseConfig = require("./config/database-config.json");
const Pool = require("pg").Pool;
const pool = new Pool(databaseConfig);

const createUser = async (email, hashedPassword, secureId) => {
  var results = await pool.query(
    "INSERT INTO login (email, username, hashed_password, secure_id) VALUES ($1, $2, $3, $4)",
    [email, email, hashedPassword, secureId]
  );
  return results && results.rowCount > 0;
};

const findUserByEmail = async (email) => {
  return await pool.query("SELECT * FROM login WHERE email = $1", [email]);
};

const createMerchant = async (loginId, merchantName, privateKey) => {
  var result = await pool.query(
    "INSERT INTO merchant (login_id, merchant_name, merchant_private_key) VALUES ($1, $2, $3)",
    [loginId, merchantName, privateKey]
  );
  if (result.rowCount > 0) {
    return true;
  }
  return false;
};

const findUserBySecureId = async (secureId) => {
  return await pool.query("SELECT * FROM login WHERE secure_id = $1", [
    secureId,
  ]);
};

const getLoginIdBySecureId = async (secureId) => {
  let result = await pool.query(
    "SELECT login_id FROM login WHERE secure_id = $1",
    [secureId]
  );
  if (result.rows != null && result.rows.length > 0) {
    return result.rows[0]["login_id"];
  }
  return null;
};

const getAllMerchantsBySecureId = async (secureId) => {
  let loginId = await getLoginIdBySecureId(secureId);
  let result = await pool.query(
    "SELECT merchant_id AS merchantId, merchant_name AS merchantName FROM merchant WHERE login_id = $1",
    [loginId]
  );
  return result.rows;
};

const deleteMerchantBySecureId = async (secureId, merchantId) => {
  let loginId = await getLoginIdBySecureId(secureId);
  let result = await pool.query(
    "DELETE FROM merchant WHERE login_id = $1 AND merchant_id = $2",
    [loginId, merchantId]
  );
  return result.rowCount > 0;
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserBySecureId,
  createMerchant,
  getLoginIdBySecureId,
  getAllMerchantsBySecureId,
  deleteMerchantBySecureId
};
