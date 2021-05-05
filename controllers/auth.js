const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');



const login = async (req = request, resp = response) => {
    const { email, password } = req.body;
    try{

        const dbUser = await Usuario.findOne({email});
        
        if(!dbUser){
            return resp.status(404).json({
                ok : false,
                msg : 'Contraseña o email no validos'
            });
        }

        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword){
            return resp.status(400).json({
                ok : false,
                msg : 'Contraseña o email no valido'
            });
        }

        const token = await generarJWT(dbUser.id);

        return resp.status(200).json({
            ok : true,
            token
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrió un error al momento de iniciar sesión'
        })
    }
}


module.exports = {
    login
}