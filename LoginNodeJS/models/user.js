const db = require('../db');
const { findOne } = require('./blockedUser');

//Create a table for users in the database if it doesn't exist at application start
!(async function createTable() {
  const userQuery = `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL)`;
  const insertAdmin = `INSERT INTO users(username, password) VALUES ('admin', 'admin')`;
  await db.query(userQuery);

  const adminUser = await findOne('admin', 'admin');
  if (adminUser.length === 0) {
    await db.query(insertAdmin);
  }
})();

exports.findAll = async function () {
  const results = await db.query('SELECT * FROM users');
  return results[0];
};

exports.findOne = async function (id) {
  const result = await db.query('SELECT * FROM users WHERE id=?', id);
  return result[0];
};

exports.findOne = async function (username, password) {
  const result = await db.query(
    'SELECT * FROM users WHERE username=? AND password=?',
    [username, password]
  );
  return result[0];
};

exports.create = async function (username, password) {
  await db.query('INSERT INTO users(username, password) VALUES (?, ?)', [
    username,
    password,
  ]);
};

exports.update = async function (username, password, id) {
  await db.query(
    'UPDATE users SET username=?, password=?, description=? WHERE id=?',
    [username, password, id]
  );
};
