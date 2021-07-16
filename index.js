const express = require('express');
const cors = require('cors');
require('dotenv').config();
const paht = require('path');

const { dbConnection } = require('./db/config');




const app = express();
dbConnection();



app.use( cors() );
app.use( express.json() );

//Directorio público
app.use( express.static('public') );

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/hospital', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/todo/', require('./routes/busquedas') );
app.use( '/api/upload' , require('./routes/uploads') );

app.get('*', (req, resp) => {
    resp.sendFile( path.resolve(__dirname, 'public/index.html') );
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor arriba en el puerto ${process.env.PORT}`);
})