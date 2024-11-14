const express = require('express');
const database = require('./config/db');

const app = express();

app.use(express.json());

app.get('/get-mahasiswa', function(req, res) {
    const queryStr = "SELECT * FROM mahasiswa WHERE deletedAt IS NULL"
    database.query(queryStr, (err, results)=> {
        if(err) {
            console.log(err);
            res.error(error.sqlMessage, res);
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses Menampilkan Seluruh Data Mahasiswa",
                "data": results 
            })
        }
    })
})

app.post('/store-mahasiswa', function(req, res) {
    const param = req.body;
    const name = param.name;
    const jurusan = param.jurusan;
    const now = new Date();

    const queryStr = "INSERT INTO mahasiswa (name, jurusan, createdAt) VALUES (?,?,?)";
    const values = [name, jurusan, now]

    database.query(queryStr, values, (err, results)=>{
        if(err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses Menambahkan Data Mahasiswa",
                "data": results
            })
        }
    })
})

app.listen(3000)