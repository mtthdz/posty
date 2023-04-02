const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'mochi',
  host: 'localhost',
  database: 'posty',
  password: 'mochi',
  port: 5432,
})

const getUsers = (req, res) => {
  const query = 'SELECT * FROM users ORDER BY id ASC';

  pool.query(query, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results.rows);
    }
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'SELECT * FROM users WHERE id = $1';

  pool.query(query, [id], (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(results.rows);
    }
  })
}

const createUser = (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';

  pool.query(
    query,
    [name, email],
    (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    }
  )
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';

  pool.query(
    query,
    [id, name, email],
    (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(`User modified with ID: ${id}`);
      }
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const query = 'DELETE FROM users WHERE id = $1';

  pool.query(query, [id], (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(`User deleted with ID: ${id}`)
    }
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
