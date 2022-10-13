import Container from '../controllers/container.js';
import express from 'express';
const { Router } = express;

const router = Router();

const products = new Container('../data/products.json');

/////// HTTP request methods routing //////

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
    products.save(prod)
        .then((id)=> res.status(201).send({ id }))
        .catch( error => console.log(error));
})

router.put('/api/:id', (req, res) => {
    const prod = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }
    res.status(102);
    products.overwriteById(parseInt(req.params.id), prod)
        .then( _ =>res.status(201).send())
        .catch( error => console.log(error));
})

router.delete('/api/:id', (req, res) => {
    res.status(102);
    products.deleteById(parseInt(req.params.id))
        .then( () =>res.status(200).send())
        .catch( error => console.log(error));
})

export default router;