const database = require('../config/db');

exports.getMahasiswa = (req, res) => {
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
};

exports.storeMahasiswa = (req, res) => {
    const param = req.body;
    const name = param.name;
    const jurusan = param.jurusan;
    const now = new Date();

    if (!name || !jurusan) {
        return res.status(400).json({
            "success": false,
            "message": "Nama dan Jurusan wajib diisi.",
            "data": null
        });
    }

    const queryStr = "INSERT INTO mahasiswa (name, jurusan, createdAt) VALUES (?,?,?)";
    const values = [name, jurusan, now];

    database.query(queryStr, values, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        } else {
            res.status(200).json({
                "success": true,
                "message": "Sukses Menambahkan Data Mahasiswa",
                "data": results
            });
        }
    });
};


exports.getMahasiswaById = (req, res) => {
    const param = req.query;
    const id = param.id;

    const queryStr = "SELECT * FROM mahasiswa WHERE deletedAt IS NULL AND  id = ?"
    const values = [id]

    database.query(queryStr, values, (err, results)=> {
        if(err) {
            console.log(err);
            res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            })
        } else {
            if (results.length > 0) {
                res.status(200).json({
                    "success": true,
                    "message": "Sukses Menampilkan Data Mahasiswa melalui ID",
                    "data": results
                });
            } else {
                res.status(404).json({
                    "success": false,
                    "message": "Data mahasiswa tidak ditemukan atau telah dihapus.",
                    "data": null
                });
            }
        }
    })
};

exports.updateMahasiswa = (req, res) => {
    const param = req.body;
    const id = param.id;
    const name = param.name;
    const jurusan = param.jurusan;

    if (!name || !jurusan) {
        return res.status(400).json({
            "success": false,
            "message": "Nama dan Jurusan tidak boleh kosong.",
            "data": null
        });
    }

    const checkQuery = "SELECT name, jurusan FROM mahasiswa WHERE id = ? AND deletedAt IS NULL";
    const checkValues = [id];

    database.query(checkQuery, checkValues, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                "success": false,
                "message": "Mahasiswa dengan ID tersebut tidak ditemukan atau telah dihapus.",
                "data": null
            });
        }

        const currentName = results[0].name;
        const currentJurusan = results[0].jurusan;

        if (currentName === name && currentJurusan === jurusan) {
            return res.status(200).json({
                "success": true,
                "message": "Data Sudah Sesuai",
                "data": results
            });
        }

        const queryStr = "UPDATE mahasiswa SET name = ?, jurusan = ? WHERE id = ? AND deletedAt IS NULL";
        const values = [name, jurusan, id];

        database.query(queryStr, values, (err, updateResults) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    "success": false,
                    "message": err.sqlMessage,
                    "data": null
                });
            }

            if (updateResults.affectedRows > 0) {
                return res.status(200).json({
                    "success": true,
                    "message": "Sukses Mengupdate Data Mahasiswa",
                    "data": updateResults
                });
            } else {
                return res.status(404).json({
                    "success": false,
                    "message": "Data mahasiswa tidak ditemukan atau telah dihapus.",
                    "data": null
                });
            }
        });
    });
};

exports.deleteMahasiswa = (req, res) => {
    const param = req.body;
    const id = param.id;
    const now = new Date();

    if (!id) {
        return res.status(400).json({
            "success": false,
            "message": "ID Tidak Terdaftar",
            "data": null
        });
    }

    const checkQuery = "SELECT id FROM mahasiswa WHERE id = ? AND deletedAt IS NULL";
    const checkValues = [id];

    database.query(checkQuery, checkValues, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                "success": false,
                "message": err.sqlMessage,
                "data": null
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                "success": false,
                "message": "ID Tidak Terdaftar",
                "data": null
            });
        }

        const queryStr = "UPDATE mahasiswa SET deletedAt = ? WHERE id = ?";
        const values = [now, id];

        database.query(queryStr, values, (err, updateResults) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    "success": false,
                    "message": err.sqlMessage,
                    "data": null
                });
            }

            if (updateResults.affectedRows > 0) {
                return res.status(200).json({
                    "success": true,
                    "message": "Sukses Menghapus Data Mahasiswa",
                    "data": updateResults
                });
            } else {
                return res.status(404).json({
                    "success": false,
                    "message": "Data mahasiswa tidak ditemukan atau telah dihapus.",
                    "data": null
                });
            }
        });
    });
};

