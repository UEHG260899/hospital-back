const { request, response } = require('express');
const Hospital = require('../models/Hospital');

const getHospitales = async (req = request, resp = response) => {
    return resp.status(200).json({
        ok : true,
        msg : 'getHospitales'
    });
}

const crearHospitales = async (req = request, resp = response) => {
    
    const uid = req.uid;
    const hospital = new Hospital({
        usuario : uid,
        ...req.body
    });

    try{
        const hospitalDB = await hospital.save();

        return resp.status(200).json({
            ok : true,
            hospital : hospitalDB
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al momento de crear el hospital'
        });
    }
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