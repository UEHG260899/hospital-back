const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4 : uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-foto');

const cargaArchivos = (req = request, resp = response) => {
    
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if(!tiposValidos.includes(tipo)){
        return resp.status(400).json({
            ok : false,
            msg : 'No es un medico, usuario u hospital'
        });
    }

    //Existencia de una archivo
    if(!req.files || Object.keys(req.files).length === 0){
        return resp.status(400).json({
            ok : false,
            msg : 'No se enviaron archivos'
        });
    }

    //Procesamiento del archivo
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');

    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if(!extensionesValidas.includes(extensionArchivo)){
        return resp.status(400).json({
            ok : false,
            msg : 'No es una extension permitida'
        });
    }

    //Nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover imagen
    file.mv(path, (err) => {
        if(err){
            console.log(err);
            return resp.status(500).json({
                ok : false,
                msg : 'Error al cargar el archivo'
            });
        }

        //Actualizar BD
        actualizarImagen(tipo, id, nombreArchivo);

        resp.status(200).json({
            ok : true,
            msg : 'Archivo subido',
            nombreArchivo
        });
    });
    
}

const mostrarImagen = (req = request, resp = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` );

    //Imagen por defecto
    if(fs.existsSync(pathImg)){
        resp.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
        resp.sendFile(pathImg);
    }

    
}


module.exports = {
    cargaArchivos,
    mostrarImagen
}

