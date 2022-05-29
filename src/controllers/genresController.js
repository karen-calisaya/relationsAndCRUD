const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll({
            include: [{association: 'movies'}] /* este 'movies' es el alias q esta en el modeloGenre */
        })
            .then(genres => {
                res.send(genres)
/*                 res.render('genresList.ejs', {genres})
 */            })
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = genresController;