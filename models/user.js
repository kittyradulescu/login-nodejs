const db = require("../db");

//Create a table for products in the database if it doesn't exist at application start
!async function createTable() {
    const tableQuery = `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL)`;
   
    await db.query(tableQuery);    
}();

exports.findAll = async function () {
    const results = await db.query("SELECT * FROM users");
    return results[0];
}

exports.findOne = async function (id) {
    const result = await db.query("SELECT * FROM users WHERE id=?", id);
    return result[0];
}

exports.create = async function (username, password) {
    await db.query("INSERT INTO users(username, password) VALUES (?, ?)", [username, password]);
}

exports.update = async function (username, password, id) {
    await db.query("UPDATE users SET username=?, password=?, description=? WHERE id=?",
        [username, password, id]);
}