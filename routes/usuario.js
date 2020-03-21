//Requires
var express = require('express');
var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt');
var mdAuth = require('../middlewares/auth');

// Inicializar Variables
var app = express();


// =============================================
// Obtener todos los usuarios
// =============================================
app.get('/', mdAuth.verificaToken, (req, res, next) => {

    Usuario.find({}, 'id nombre email img role')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Error cargando usuario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuarios
            });
        });

});

// // =============================================
// // Verificar Token
// // =============================================

// app.use('/', (req, res, next) => {
//     var token = req.query.token;

//     jwt.verify(token, SEED, (err, decoded) => {
//          return res.status(401).json({
//              ok: false,
//              msg: 'Token Incorrecto',
//              errors: {
//                  message: 'No existe un usuario con ese ID'
//              }
//          });
//     } )
// });

// =============================================
// Insertar un nuevo usuario
// =============================================

app.post('/', mdAuth.verificaToken, (req, res, next) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al crear usuario',
                errors: err
            });
        }

        usuarioGuardado.password = "";

        res.status(201).json({
            ok: true,
            usuarioGuardado,
            usuariotoken: req.usuario
        });
    });

});

// =============================================
// Actualizar Usuario
// =============================================
app.put('/:id', mdAuth.verificaToken, (req, res, next) => {
    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
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
                msg: `El usuario con el ID ${(id)} no existe`,
                errors: {
                    message: 'No existe un usuario con ese ID'
                }
            });


        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuario.password = "";

            res.status(200).json({
                ok: true,
                usuarioGuardado
            });
        });
    });
});


// =============================================
// Actualizar Usuario
// =============================================
app.delete('/:id', mdAuth.verificaToken, (req, res, next) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al borrar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario con el ID ${(id)} no existe`,
                errors: {
                    message: 'No existe un usuario con ese ID'
                }
            });


        } else {
            return res.status(200).json({
                ok: true,
                msg: `El usuario con el ID ${(id)} fue borrado`
            });
        }


    });
});


module.exports = app;