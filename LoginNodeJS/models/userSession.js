const db = require('../db');

//Create a table for user sessions in the database if it doesn't exist at application start
!(async function createTable() {
  const userSessionQuery = `CREATE TABLE IF NOT EXISTS userSession (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            visitorId VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP NOT NULL)`;
  await db.query(userSessionQuery);
})();

exports.create = async function (username, visitorId, timestamp) {
  await db.query(
    'INSERT INTO userSession(username, visitorId, timestamp) VALUES (?, ?, ?)',
    [username, visitorId, timestamp]
  );
};
