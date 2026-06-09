const mysql = require("mysql2/promise");

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "ankete_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});