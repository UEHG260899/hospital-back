const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { cargaArchivos, mostrarImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.use( fileUpload() );

router.put('/:tipo/:id', validarJWT, cargaArchivos);

router.get('/:tipo/:foto', mostrarImagen);



module.exports = router;