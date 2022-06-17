require("dotenv").config();
const mysql = require("mysql2");

// Connect to the database
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conexion.connect(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("Conexión correcta");
    }
});

module.exports = { conexion };
