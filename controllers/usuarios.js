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

const actualizaUsuario = async (req = request, resp = response) => {
    const uid = req.params.id;

    try{
        const dbUser = await Usuario.findById(uid);


        if(!dbUser){
            return resp.status(404).json({
                ok : false,
                msg : 'No existe un usuario con ese ID'
            });
        }
        
        const {google, password, email, ...campos} = req.body;

        if(dbUser.email !== email){
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return resp.status(400).json({
                    ok : false,
                    msg : 'Ya existe un usuario con ese email'
                });
            }
        }


        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new : true});

        return resp.status(200).json({
            ok : true,
            usuario : usuarioActualizado
        })
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al momento de actualizar el usuario'
        })
    }
}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizaUsuario
}