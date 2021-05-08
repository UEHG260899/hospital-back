const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./db/config');




const app = express();
dbConnection();



app.use( cors() );
app.use( express.json() );

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/hospital', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo/', require('./routes/busquedas') );

app.listen(process.env.PORT, () => {
    console.log(`Servidor arriba en el puerto ${process.env.PORT}`);
})