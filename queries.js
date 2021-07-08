import databaseConfig from ('./config/database-config.json');
const Pool = require('pg').Pool
const pool = new Pool(databaseConfig);
