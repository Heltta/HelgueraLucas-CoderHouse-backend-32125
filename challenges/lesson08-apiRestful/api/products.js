const Contenedor = require('../modules/productos.js');
const express = require('express')
const { Router } = express;

const router = Router();

const products = new Contenedor('./uploads/productos.json');

router.get('/', (req, res) => {
    products.getAll()
        .then((products)=>res.send(products));
})

router.get('/:id', (req, res) => {
    products.getById(parseInt(req.params.id))
        .then((product)=>(product.length === 0)?
            res.status(404).send({ error : 'producto no encontrado' }) :
            res.status(302).send(product));
})

router.post('/', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    res.status(102);
    products.save(prod)
        .then((id)=> res.status(201).send({ id }))
        .catch( error => console.log(error));
})

router.put('/:id', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    res.status(102);
    products.overwriteById(parseInt(req.params.id), prod)
        .then( () =>res.status(201).send())
        .catch( error => console.log(error));
})

router.delete('/:id', (req, res) => {
    res.status(102);
    products.deleteById(parseInt(req.params.id))
        .then( () =>res.status(200).send())
        .catch( error => console.log(error));
})

module.exports = router;