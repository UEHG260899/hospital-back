const { request, response } = require('express');
const Medico = require('../models/Medicos');

const getMedicos = async (req = request, resp = response) => {
    
    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
    
    return resp.status(200).json({
        ok : true,
        medicos
    });
}

const crearMedicos = async (req = request, resp = response) => {
    
    const uid = req.uid;
    const medico = new Medico({
        usuario : uid,
        ...req.body
    });

    try{
        const medicoDB = await medico.save();

        return resp.status(200).json({
            ok : true,
            medico : medicoDB
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al momento de crear al medico'
        });
    }
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