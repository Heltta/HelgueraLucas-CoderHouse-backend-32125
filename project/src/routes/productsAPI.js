const Container = require('../controllers/container.js');
const express = require('express')
const { Router } = express;

const router = Router();

const products = new Container('../data/products.json');

/////// HTTP request methods routing //////

router.get('/', (req, res) => {
    products.getAll()
        .then( (products) => res.render(
            'viewProducts',
            {items: products, listExists: _ => products.length !== 0}))
})

router.post('/', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    res.status(102);
    const sendProductList =  require('../server.js')
    products.save(prod)
        .then( _ => res.status(201).redirect('/'))
        .then( _ => sendProductList('broadcast'))
        .catch( error => console.log(error));
})

// Eventos restful

router.get('/api/', (req, res) => {
    products.getAll()
        .then((products)=>res.send(products));
})

router.get('/api/:id', (req, res) => {
    products.getById(parseInt(req.params.id))
        .then((product)=>(product.length === 0)?
            res.status(404).send({ error : 'producto no encontrado' }) :
            res.status(302).send(product));
})

router.post('/api/', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    res.status(102);
    const sendProductList =  require('../server.js')
    products.save(prod)
        .then((id)=> res.status(201).send({ id }))
        .then( _ => sendProductList('broadcast'))
        .catch( error => console.log(error));
})

router.put('/api/:id', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    res.status(102);
    const sendProductList =  require('../server.js')
    products.overwriteById(parseInt(req.params.id), prod)
        .then( _ =>res.status(201).send())
        .then( _ => sendProductList('broadcast'))
        .catch( error => console.log(error));
})

router.delete('/api/:id', (req, res) => {
    res.status(102);
    products.deleteById(parseInt(req.params.id))
        .then( () =>res.status(200).send())
        .catch( error => console.log(error));
})

module.exports = router;