var express = require('express');
var app = express();

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function () {
    console.log('Servidor encendido en puerto ' + puerto);
});

app.use( express.static(__dirname +'/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});