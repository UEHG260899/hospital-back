const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusquedaTotal } = require('../controllers/busquedas');


const router = Router();


router.get('/:busqueda', validarJWT, getBusquedaTotal);



module.exports = router;