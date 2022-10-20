const express = require('express');

const app = express();

// load handlebars
const handlebars = require('express-handlebars');

// config handlebars
app.engine(
    "hbs", // template engine reference name (it will be used later with a .set())
    handlebars.engine({ // handlebars config function
        extname: ".hbs", // extension used (instead of default .handlebars)
        defaultLayout: 'index.hbs', // main template
        layoutsDir: __dirname+'/views/layouts', // main template directory route
        partialsDir: __dirname+'/views/partials', // partials templates directory route
    })
);

app.set('view engine', 'hbs'); // register template engine
app.set('views', './views'); // set template files folder
app.use(express.static("./public")) // set server public space

const userData = { 
    titulo: 'CoderHouse',
    nombre: 'Pepe',
    apellido: 'Botella',
    edad: '40',
    email: 'pepito_botellon@hotmail.com',
    telefono: '+599 91 123 123'
};


// renderizo una vista de home
app.get('/',  (req, res) => {
    res.render('main', userData);
});


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

