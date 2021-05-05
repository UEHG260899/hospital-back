const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/', [
    check('email', 'El campo email debe de ser un email valido').isEmail(),
    check('password', 'El campo password es obligatorio').notEmpty(),
    validarCampos
], login);


module.exports = router;