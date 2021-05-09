const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.post('/', [
    check('email', 'El campo email debe de ser un email valido').isEmail(),
    check('password', 'El campo password es obligatorio').notEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('token', 'El token de google es obligatorio').notEmpty(),
    validarCampos
], googleSignIn);


module.exports = router;