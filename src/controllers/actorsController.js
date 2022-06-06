const db = require('../database/models');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator');
const res = require('express/lib/response');



module.exports = {
    list: (req, res) => {
        db.Actor.findAll()
        .then((actors) => res.render('actorsList', {actors}))
        .catch((err) => res.send(err))
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id)
        .then((actor) => res.render('actorsDetail', {actor}))
        .catch((err) => res.send(err))
    },
    add: (req, res) => {
        db.Actor.findAll()
        .then(()=> res.render('actorsAdd'))
        .catch((err) => res.send(err))
    },
    create: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty){
            db.Actor.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating
            })
            .then(() => res.send())
            .catch((err) => res.send(err))
            res.redirect('/actors')
        }else{
            res.render('actorsAdd', {errors})
        }
    },
    edit: (req, res) => {
        db.Actor.findByPk(req.params.id)
        .then((actor) => res.render ('actorsEdit', {actor}))
        .catch((error) => res.send(error))
    },
    update: (req, res) => {
        let errors = validationResult(req)  /* COMPLETAR */
        db.Actor.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating
        }, {
            where : {
                id: req.params.id
            }
        })
        .then(() => res.redirect('/actors'))
        .catch((error) => res.send(error))
    },
    delete: (req, res) => {
        db.Actor.findByPk(req.params.id)
        .then((actor) => res.render('actorsDelete', {actor}))
    }
}