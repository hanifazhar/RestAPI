const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kuliah",
    charset: "utf8mb4",
    timezone: "+07:00"
})

db.getConnection((err) => {
    if (err) throw err
    console.log('DB Connected')
})

module.exports = db; 