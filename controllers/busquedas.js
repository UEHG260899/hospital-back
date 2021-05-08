const { request, response } = require('express');
const Usuario = require('../models/Usuario');
const Medico = require('../models/Medicos');
const Hospital = require('../models/Hospital');


const getBusquedaTotal = async(req = request, resp = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre : regex }),
        Hospital.find({ nombre : regex }),
        Medico.find({ nombre : regex })
    ]);

    return resp.status(200).json({
        ok : true,
        usuarios,
        hospitales,
        medicos
    })
}

module.exports = {
    getBusquedaTotal
}
