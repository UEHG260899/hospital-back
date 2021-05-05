const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./db/config');




const app = express();
dbConnection();



app.use( cors() );
app.use( express.json() );

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') )

app.listen(process.env.PORT, () => {
    console.log(`Servidor arriba en el puerto ${process.env.PORT}`);
})