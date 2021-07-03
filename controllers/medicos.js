const { request, response } = require('express');
const Medico = require('../models/medicos');

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
    
    const id = req.params.id;
    const uid = req.uid;
    try {
        const dbMedico = await Medico.findById(id);
        
        if(!dbMedico){
            return resp.status(404).json({
                ok : false,
                msg : 'No se encontro un medico con ese id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario : uid
        }

        const medicoActual = await Medico.findByIdAndUpdate(id, cambiosMedico, { new : true });

        resp.status(200).json({
            ok : true,
            medico : medicoActual
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Error al momento de actualizar al medico'
        });
    }
}

const borraMedicos = async (req = request, resp = response) => {
    
    const id = req.params.id;

    try{

        const dbMedico = await Medico.findById(id);

        if(!dbMedico){
            return resp.status(404).json({
                ok : false,
                msg : 'No se encontro a un medico con ese id'
            });
        }

        await Medico.findByIdAndDelete(id);

        resp.status(200).json({
            ok : true,
            msg : 'Se ha  eliminado el medico'
        });
    }catch(err){
        console.log(err);
        return resp.status(500).json({
            ok : false,
            msg : 'Ocurrio un error al eliminar el medico'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizaMedicos,
    borraMedicos
}