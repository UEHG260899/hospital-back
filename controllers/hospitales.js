const { request, response } = require('express');

const getHospitales = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'getHospitales'
    });
}

const crearHospitales = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'crearHospitales'
    });
}

const actualizarHospital = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'actualizarHospital'
    });
}

const borrarHospitales = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'borrarHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospital,
    borrarHospitales
}