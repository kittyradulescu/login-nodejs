const db = require('../db');

//Create a table for users in the database if it doesn't exist at application start
!(async function createTable() {
  const blockerUserQuery = `CREATE TABLE IF NOT EXISTS blocked_user (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        noOfTries INT NOT NULL,
        timestamp TIMESTAMP NOT NULL)`;
  await db.query(blockerUserQuery);
})();

exports.findOne = async function (username) {
  const result = await db.query(
    'SELECT * FROM blocked_user WHERE username=?',
    username
  );
  return result[0];
};

exports.create = async function (username, nrTries, timestamp) {
  await db.query(
    'INSERT INTO blocked_user(username, noOfTries, timestamp) VALUES (?, ?, ?)',
    [username, nrTries, timestamp]
  );
};

exports.update = async function (id, nrOfTries) {
  await db.query('UPDATE blocked_user SET noOfTries=?, timestamp=? WHERE id=?', [nrOfTries, new Date(), id]);
};
