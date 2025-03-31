require("dotenv").config();
const mysql = require("mysql2");

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify for async/await usage
const promisePool = pool.promise();


module.exports = promisePool;


// to Create USER Table
// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     fullName VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL
// );


// To Create Room Table
// CREATE TABLE rooms (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255),
//     description TEXT,
//     address VARCHAR(255),
//     city VARCHAR(100),
//     type VARCHAR(50),
//     price DECIMAL(10,2),
//     preference VARCHAR(100),
//     ber VARCHAR(10),
//     images JSON,  
//     userId INT
// );