//Requires
var express = require('express');

// Inicializar Variables
var app = express();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        msg: 'Get de App'
    });
});

module.exports = app;