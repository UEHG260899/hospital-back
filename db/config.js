const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.BD_CON, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true,
            useFindAndModify: false
        });

        console.log('Base de datos arriba');
    }catch(error){
        throw new Error('Error al iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}