//Requires
var express = require('express');
var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// Inicializar Variables
var app = express();


app.post('/', (req, res) => {
    var body = req.body;


    Usuario.findOne({
        email: body.email
    }, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta',
                errors: {
                    message: 'Usuario o contraseña incorrecta - Usuario'
                }
            });


        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {


            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrecta',
                errors: {
                    message: 'Usuario o contraseña incorrecta -Password'
                }
            });
        }

        // Crear un TOKEN
        var token = jwt.sign({
            usuario
        }, SEED, {
            expiresIn: 14400
        });

        usuario.password = "";
        res.status(200).json({
            ok: true,
            token,
            usuario,
            id: usuario.id
        });


    });




});




module.exports = app;