const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');
const actorsValidator = require('../validations/actorsValidator');

/* rutas para list y detail */
router.get('/actors', actorsController.list);
router.get('/actors/detail/:id', actorsController.detail);

/* rutas para CRUD */
router.get('/actors/add', actorsController.add);
router.post('/actors/create', actorsValidator, actorsController.create);
router.get('/actors/edit/:id', actorsController.edit);
router.put('/actors/update/:id', actorsController.update);

module.exports = router;