const express = require('express');
const products = require('./api/products.js');

const app = express();

//load bootstrap
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//same as app.use(express.json())
const { json } = express;
app.use(json());

//load products api
const dirProducts = '/api/productos';
app.use(dirProducts, products);

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

app.use(express.urlencoded({ extended: true}));

app.use('/productos', products);
app.use(express.static("./public"))

// const prodList = products.


// renderizo una vista de home
app.get('/',  (req, res) => {
    res.render('sendProduct', {});
});

// Start server
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`));

