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
  return await pool.query(
    "INSERT INTO merchant (login_id, merchant_name, private_key) VALUES ($1, $2, $3)",
    [loginId, merchantName, privateKey]
  );
};

const findUserBySecureId = async (secureId) => {
  return await pool.query("SELECT * FROM login WHERE secure_id = $1", [
    secureId,
  ]);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserBySecureId,
  createMerchant
};
