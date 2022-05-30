const db = require('../database/models');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator');


module.exports = {
    list: (req, res) => {
        db.Actor.findAll()
        .then((actors) => res.render('actorsList', {actors}))
    }

}