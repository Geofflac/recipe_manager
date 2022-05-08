// Import mysql package to connect to mysql server
const mysql = require("mysql");
// Import dotenv to import properties from .env file
const dotenv = require("dotenv").config();

// Define properties to be used for mysql connection
const properties = {
    host: `${process.env.DBHOST}`,
    port: process.env.DBPORT,
    user: `${process.env.DBUSER}`,
    password: `${process.env.DBPASSWD}`,
    database: `${process.env.DBNAME}`,
};

// Create a connection object which will hold the connection to cloud mysql server. Use the createPool method as it look ore stable thn "createConnection"
let connection = mysql.createPool(properties);

// Force a ramdom query to the database to keep it alive
connectiontime = 0;
connectiontestinterval = 5000;
setInterval(function () {
    connection.query('SELECT 1');
    console.log(`DB connection test ${connectiontime}s`)
    connectiontime += (connectiontestinterval/1000);
}, connectiontestinterval);

// Export the connection object so that it could be used in other code files.
module.exports = {
    connection,
};