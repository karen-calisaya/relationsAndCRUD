const { check, body} = require('express-validator');
const moviesValidator = [
    check('title')
        .notEmpty()
        .withMessage('campo requerido'),
    check('rating')
        .notEmpty()
        .withMessage('campo requerido'),
    check('awards')
        .notEmpty()
        .withMessage('campo requerido'),
    check('release_date')
        .notEmpty()
        .withMessage('campo requerido'),
    check('length')
        .notEmpty()
        .withMessage('campo requerido')

]

module.exports = moviesValidator