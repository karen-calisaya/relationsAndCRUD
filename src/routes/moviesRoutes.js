const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const moviesValidator = require('../validations/moviesValidator');

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);

//Rutas exigidas para la creación del CRUD
router.get('/movies/add', moviesController.add);
router.post('/movies/create', moviesValidator, moviesController.create);
router.get('/movies/edit/:id', moviesController.edit); /* solo envia formulario, con los datos de la pelicula  */
router.put('/movies/update/:id', moviesController.update);
router.get('/movies/delete/:id', moviesController.delete);
router.delete('/movies/delete/:id', moviesController.destroy);

module.exports = router;