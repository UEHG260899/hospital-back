const { request, response } = require('express');
const Usuario = require('../models/Usuario');
const Medico = require('../models/medicos');
const Hospital = require('../models/hospital');


const getBusquedaTotal = async (req = request, resp = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex })
    ]);

    return resp.status(200).json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}

const getDocumentodColeccion = async (req = request, resp = response) => {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let datos;
    switch (tabla) {
        case 'medicos':
            datos = await Medico.find({ nombre : regex })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            datos = await Hospital.find({ nombre : regex })
                                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            datos = await Usuario.find({ nombre : regex });
            break;
        default :
            return resp.status(400).json({
                ok : false,
                msg : 'La tabla debe de ser medicos/usuarios/hospitales'
            });
            break;
    }

    return resp.status(200).json({
        ok : true,
        datos
    });
}

module.exports = {
    getBusquedaTotal,
    getDocumentodColeccion
}
