//Requires
var express = require('express');
var mongoose = require('mongoose');
var appRoutes = require('./routes/app');
var loginRoutes = require('./routes/login');
var usuarioRoutes = require('./routes/usuario');
var bodyParser = require('body-parser');

// Inicializar Variables
var app = express();

// Body-Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())


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
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express server escuchando puerto 3000 Estado: \x1b[32m%s\x1b[0m', 'Online');
});