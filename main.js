const express = require('express')
const Contenedor = require('./Contenedor.js');

const app = express()

const PORT = 8080

let contenedor = new Contenedor("contenedor");


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => console.log(`error ${error}`))

app.get('/', (req, res) => {
    res.send({
        Ingrese: '/productos o /productosRandom'
    })
})

app.get('/productos', (req, res) => {
    (async () => {
        await contenedor.getAll().then((response) => {
            res.send(response);
        });
    })();
})

app.get('/productoRandom', (req, res) => {
    (async () => {
        await contenedor.getAll().then((response) => {
            let random = Math.floor(Math.random() * response.length);
            res.send(response[random]);
        });
    })();
})


