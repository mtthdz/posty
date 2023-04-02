const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'mochi',
  host: 'localhost',
  database: 'posty',
  password: 'mochi',
  port: 5432,
})