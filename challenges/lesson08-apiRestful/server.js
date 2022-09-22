const express = require('express');
const multer = require('multer');

const app = express();
const { json } = express;

app.use(json());

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

app.post('/uploadfile', upload.single('myfile') ,(req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
})

app.post('/uploadmultiple', upload.array('myfiles',12) ,(req, res, next) => {
    const files = req.files
    if (!files) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})


