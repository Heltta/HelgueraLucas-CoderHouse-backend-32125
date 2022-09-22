const express = require('express');

const app = express();
const { json } = express;

app.use(json());

app.get('/', (req,res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
