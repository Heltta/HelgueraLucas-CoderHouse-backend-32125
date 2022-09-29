const express = require('express');

const app = express();

//same as app.use(express.json())
const { json } = express;
app.use(json());

// app.use(express.urlencoded({ extended: true}));

// app.use(express.static("./public"))

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

const fs = require('fs');

// defino el motor de plantilla de ejemplo
app.engine('ntl', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) {
            return callback(new Error(err));
        }

        const rendered = content.toString()
            .replace('#title#', ''+ options.title +'')
            .replace('#message#', ''+ options.message +'');
        
        return callback(null, rendered);
    });
});
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'ntl'); // registra el motor de plantillas

// renderizo una vista usando el motor custom del ejemplo
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

// defino motor de plantilla del desafío
app.engine('cte', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
        if (err) {
            return callback(new Error(err));
        }

        const rendered = content.toString()
            .replace('^^titulo$$', ''+ options.titulo +'')
            .replace('^^mensaje$$', ''+ options.mensaje +'')
            .replace('^^autor$$', ''+ options.autor +'')
            .replace('^^version$$', ''+ options.version +'');
        
        return callback(null, rendered);
    });
});
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'cte'); // registra el motor de plantillas

// renderizo una vista usando el motor custom del desafio
app.get('/cte1', function (req, res) {
    res.render('plantilla1', {
        titulo:     "Plantilla custom para el desafío",
        mensaje:    "Esta es la ruta a la plantilla 1",
        autor:      "Pepe botella",
        version:    "1.0.0"
        }
        );
});
