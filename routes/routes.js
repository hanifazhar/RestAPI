const express = require('express');
const router = express.Router();
const Controllers = require('../controllers/controllers.js');

router.get('/get-mahasiswa', Controllers.getMahasiswa);
router.get('/get-mahasiswa-by-id', Controllers.getMahasiswaById);
router.post('/store-mahasiswa', Controllers.storeMahasiswa);
router.post('/update-mahasiswa', Controllers.updateMahasiswa);
router.post('/delete-mahasiswa', Controllers.deleteMahasiswa);

module.exports = router;