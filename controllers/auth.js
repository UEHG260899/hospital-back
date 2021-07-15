const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');



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
            token,
            menu: getMenuFrontEnd(dbUser.role)
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrió un error al momento de iniciar sesión'
        })
    }
}

const googleSignIn = async(req = request, resp = response) => {
    
    const tokenGoogle = req.body.token;
    

    try{
        const { name, email, picture } = await googleVerify(tokenGoogle);


        //Verificar si existe el email en la BD
        const dbUser = await Usuario.findOne({ email });
        let usuario;

        if(!dbUser){
            usuario = new Usuario({
                nombre : name,
                email,
                password: '@@@',
                img : picture,
                google : true
            });
        }else{
            usuario = dbUser;
            usuario.google = true;
            usuario.password = '@@@';
        }

        await usuario.save();

        //Generar JWt
        const token = await generarJWT( usuario.id );

        resp.status(200).json({
            ok : true,
            token,
            menu: getMenuFrontEnd(usuario.role)
        });
    }catch(err){
        console.log(err);
        return resp.status(401).json({
            ok : false,
            msg : 'El token no es correcto'
        });
    }
   
}

const renewToken = async(req = request, resp = response) => {
    
    const uid = req.uid;

    const token = await generarJWT(uid);

    const dbUser = await Usuario.findById(uid);

    if(!dbUser){
        return resp.status(404).json({
            ok : false,
            msg : 'No se encontro un usuario valido'
        });
    }


    
    resp.status(200).json({
        ok: true,
        token,
        usuario : dbUser,
        menu: getMenuFrontEnd(dbUser.role)
    });
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}