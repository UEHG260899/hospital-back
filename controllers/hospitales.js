const { request, response } = require('express');
const Hospital = require('../models/Hospital');

const getHospitales = async (req = request, resp = response) => {
    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre img'); //Permite extraer datos de un registro relacionado

    return resp.status(200).json({
        ok : true,
        hospitales
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
    
    const id = req.params.id;
    try {

        const dbHospital = await Hospital.findById(id);

        if(!dbHospital){
            return resp.status(404).json({
                ok : false,
                msg : 'No existe un hospital no ese id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: req.uid
        }

        const nombre = cambiosHospital.nombre;

        if(dbHospital.nombre !== nombre){
            const existeHosp = await Hospital.findOne({ nombre });
            if(existeHosp){
                return resp.status(400).json({
                    ok : false,
                    msg : 'Ya existe otro hospital con ese nombre'
                });
            }
        }

        const hospitalActual = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new : true});
        resp.status(200).json({
            ok : true,
            hospital : hospitalActual
        });
    }catch(err){
        console.log(err);
        resp.status(500).json({
            ok : false,
            msg : 'Error al actualizar el hospital'
        })
    }
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