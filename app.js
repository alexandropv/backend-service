//Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar Variables
var app = express();

//Conexion a la Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, resp) => {
    if (err) {
        console.log('Estado Mongo DB: \x1b[41m%s\x1b[0m', 'Offline');
        throw err;
    }

    console.log('Estado Mongo DB: \x1b[32m%s\x1b[0m', 'Online');

});

//Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        msg: 'Cargado Correctamente'
    });
});

// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express server escuchando puerto 3000 Estado: \x1b[32m%s\x1b[0m', 'Online');
});