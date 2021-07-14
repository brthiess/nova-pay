var databaseConfig = require("./config/database-config.json");
const Pool = require("pg").Pool;
const pool = new Pool(databaseConfig);

const createUser = async (email, hashedPassword, secureId) => {
  var results = await pool.query(
    "INSERT INTO users (email, username, hashed_password, secure_id) VALUES ($1, $2, $3, $4)",
    [email, email, hashedPassword, secureId]
  );
  return results && results.rowCount > 0;
};

const findUserByEmail = async (email) => {
  return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

const findUserBySecureId = async (secureId) => {
  return await pool.query("SELECT * FROM users WHERE secure_id = $1", [
    secureId,
  ]);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserBySecureId,
};
