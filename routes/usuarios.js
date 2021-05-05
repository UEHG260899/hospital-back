const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuarios, actualizaUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/', getUsuarios);

router.post('/', [
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('password', 'El campo password es obligatorio').notEmpty(),
    check('email', 'El campo email debe de ser un email valido').isEmail(),
    validarCampos
], crearUsuarios);

router.put('/:id', [
    check('nombre', 'El nombre es necesario').notEmpty(),
    check('email', 'El email es necesario').notEmpty(),
    check('role', 'El role es necesario').notEmpty(),
    validarCampos
], actualizaUsuario)


module.exports = router;