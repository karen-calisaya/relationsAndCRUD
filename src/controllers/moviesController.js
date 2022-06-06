const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {validationResult} = require('express-validator');
const { title } = require('process');


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll({
            include: [{association: 'actors'}, {association: 'genre'}]
        })
            .then(movies => {
              res.render('moviesList.ejs', {movies}) 
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {  /* como quiero tambien 'consumir' los datos de la tabla de generos, consulto a genre */
        db.Genre.findAll()
        .then((allGenres) => {
            res.render('moviesAdd', {allGenres})
        })
        .catch((error) => res.send(error));
    },
    create: function (req, res) {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            })
            .then((movie) => res.redirect('/movies'))
            .catch((error) => res.send(error))
        }else{
            res.render('moviesAdd', {errors})
        }

    },
    edit: function(req, res) {
        /* aca necesitamos la pelicula a editar, y a su vez pasarle todos los generos */
        const promiseGenres = db.Genre.findAll() /* en esta valiable guardamos la consulta a la dbGenre */
        const promiseMovie = db.Movie.findByPk(req.params.id) /* aca guardamos la consulta a la dvMovie */
        Promise.all([promiseGenres, promiseMovie]) /* promise.all me permite lanzar todas las promesas */
        .then(([allGenres, Movie]) => {
            res.render('moviesEdit', {allGenres, Movie})
        })
        .catch((error) => res.send(error))
    },
    update: function (req, res) {
        let errors = validationResult(req)
        if(errors.isEmpty()){
            db.Movie.update({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }, {
                where: {     /* VITAL! para no modificar toda la tabla */
                    id: req.params.id
                }
            })
            .then(() => res.redirect('/movies')) /* no pasamos la varible Movie,xq ya la tiene */
            .catch((error) => res.send(error))
        }else{
            res.render('moviesEdit', {errors})
        }

    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
        .then((Movie)=> res.render('moviesDelete', {Movie}))
        .catch((error) => res.send(error))

    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where: {id: req.params.id}
        })
        .then(() => res.send())
        .catch((error) => res.send(error))
        res.redirect('/movies')
    }
}

module.exports = moviesController;