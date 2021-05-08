const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusquedaTotal, getDocumentodColeccion } = require('../controllers/busquedas');


const router = Router();


router.get('/:busqueda', validarJWT, getBusquedaTotal);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentodColeccion);



module.exports = router;