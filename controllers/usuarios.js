const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req = request, resp = response) => {

    //Extrallendo paraametros de la ruta
    const desde = Number(req.query.desde) || 0;

    //Ejecuta todas las promesas al mismo tiempo y usando desestructuración se obtienen los resultados inidviduales
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()
    ]);

return resp.status(200).json({
    ok: true,
    usuarios,
    total
});
}

const crearUsuarios = async (req = request, resp = response) => {
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        const salt = bcryptjs.genSaltSync(10);
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        const token = await generarJWT(usuario.id);

        return resp.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al momento de crear el usuario, revisar logs'
        });
    }

}

const actualizaUsuario = async (req = request, resp = response) => {
    const uid = req.params.id;

    try {
        const dbUser = await Usuario.findById(uid);


        if (!dbUser) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese ID'
            });
        }

        const { google, password, email, ...campos } = req.body;

        if (dbUser.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return resp.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }


        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        return resp.status(200).json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al momento de actualizar el usuario'
        })
    }
}

const borrarUsuario = async (req = request, resp = response) => {
    const uid = req.params.id;
    try {
        const dbUser = await Usuario.findById(uid);
        if (!dbUser) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        return resp.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (err) {
        console.log(err);
        return resp.status(500).json({
            ok: true,
            msg: 'Ocurrio un error al momento de eliminar al usuario'
        });
    }
}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizaUsuario,
    borrarUsuario
}