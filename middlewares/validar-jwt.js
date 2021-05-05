const { request, response } = require('express');

const jwt = require('jsonwebtoken');


const validarJWT = (req = request, resp = response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return resp.status(401).json({
            ok: false,
            msg: 'La petición no tiene token'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (err) {
        console.log(err);
        return resp.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

}


module.exports = {
    validarJWT
}