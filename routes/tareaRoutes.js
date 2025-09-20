const express = require('express');
const router = express.Router();
const tareasCtrl = require('../controllers/tareaController');

router.get('/buscar', tareasCtrl.buscar);

module.exports = router;