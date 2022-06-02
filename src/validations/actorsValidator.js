const {check} = require('express-validator');
let actorsValidator = [
    check('first_name')
        .notEmpty()
        .withMessage('campo requerido'),
    check('last_name')
        .notEmpty()
        .withMessage('campo requerido'),
    check('rating')
        .notEmpty()
        .withMessage('campo requerido'),
]

module.exports = actorsValidator;