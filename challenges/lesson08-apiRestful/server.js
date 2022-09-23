const express = require('express');
const Contenedor = require('./modules/productos');

const app = express();
const { json } = express;

app.use(json());

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

//Multer
// const multer = require('multer');

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// const upload = multer({ storage: storage })

// app.post('/uploadfile', upload.single('myfile') ,(req, res, next) => {
//     const file = req.file
//     if (!file) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(file)
// })

// app.post('/uploadmultiple', upload.array('myfiles',12) ,(req, res, next) => {
//     const files = req.files
//     if (!files) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(files)
// })


const products = new Contenedor('./uploads/productos.json');


app.get('/api/productos', (req, res) => {
    products.getAll()
        .then((products)=>res.send(products));
})

app.get('/api/productos/:id', (req, res) => {
    products.getById(parseInt(req.params.id))
        .then((product)=>res.send(product));
})
