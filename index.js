const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./db/config');




const app = express();
dbConnection();



app.use( cors() );
//Rutas
app.get('/', (req, resp) => {
    resp.status(200).json({
        ok : true,
        msg : 'Hola Mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor arriba en el puerto ${process.env.PORT}`);
})