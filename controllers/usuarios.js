const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');


const getUsuarios = async(req = request, resp = response) => {
    
    const usuarios = await Usuario.find({}, 'nombre email role google');
    
    return resp.status(200).json({
        ok : true,
        usuarios
    });
}

const crearUsuarios = async (req = request, resp = response) => {
    const { email, password } = req.body;

    try{
        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return resp.status(400).json({
                ok : false,
                msg : 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        
        return resp.status(200).json({
            ok : true,
            usuario
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al momento de crear el usuario, revisar logs'
        });
    }

}


module.exports = {
    getUsuarios,
    crearUsuarios
}