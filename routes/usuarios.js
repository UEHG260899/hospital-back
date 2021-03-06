const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuarios, actualizaUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole, validarAdminRoleOMismo } = require('../middlewares/validar-jwt'); 



const router = Router();

router.get('/', validarJWT, getUsuarios);

router.post('/', [
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('password', 'El campo password es obligatorio').notEmpty(),
    check('email', 'El campo email debe de ser un email valido').isEmail(),
    validarCampos
], crearUsuarios);

router.put('/:id', [
    validarJWT,
    validarAdminRoleOMismo,
    check('nombre', 'El nombre es necesario').notEmpty(),
    check('email', 'El email es necesario').notEmpty(),
    check('role', 'El role es necesario').notEmpty(),
    validarCampos
], actualizaUsuario);


router.delete('/:id', [validarJWT, validarAdminRole], borrarUsuario);


module.exports = router;