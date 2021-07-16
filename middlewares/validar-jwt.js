const { request, response } = require('express');
const Usuario = require('../models/Usuario');

const jwt = require('jsonwebtoken');


const validarJWT = (req = request, resp = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'La petición no tiene token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (err) {
        console.log(err);
        return resp.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}


const validarAdminRole = async (req = request, resp = response, next) => {


    const uid = req.uid;

    try {
        
        const usuarioDb = await Usuario.findById(uid);

        if(!usuarioDb){
            return resp.status(404).json({
                ok : false,
                msg : 'El usuario no existe'
            });
        }

        if(usuarioDb.role !== 'ADMIN_ROLE'){
            return resp.status(403).json({
                ok : false,
                msg : 'No tiene privilegios para hcer eso'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok : false,
            msg: 'Ocurrio un error al validar si el usuarios es administrador'
        });
    }
}

module.exports = {
    validarJWT,
    validarAdminRole
}