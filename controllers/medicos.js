const { request, response } = require('express');

const getMedicos = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'getMedicos'
    });
}

const crearMedicos = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'crearMedicos'
    });
}

const actualizaMedicos = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'actualizaMedicos'
    });
}

const borraMedicos = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'borraMedicos'
    });
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizaMedicos,
    borraMedicos
}