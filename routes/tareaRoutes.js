const express = require('express');
const router = express.Router();
const { buscar} = require('../controllers/tareaController');

router.get('/buscar', buscar);

module.exports = router;