const { request, response } = require('express');
const Usuario = require('../models/Usuario');


const getUsuarios = async(req = request, resp = response) => {
    
    const usuarios = await Usuario.find({}, 'nombre email role google');
    
    return resp.status(200).json({
        ok : true,
        usuarios
    });
}

const crearUsuarios = async (req = request, resp = response) => {
    const { email, password, nombre } = req.body;

    const usuario = new Usuario( req.body );

    await usuario.save();
    
    resp.status(200).json({
        ok : true,
        usuario
    });
}


module.exports = {
    getUsuarios,
    crearUsuarios
}