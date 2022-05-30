const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

/* rutas para actores y crud */
router.get('/actors', actorsController.list);

module.exports = router;