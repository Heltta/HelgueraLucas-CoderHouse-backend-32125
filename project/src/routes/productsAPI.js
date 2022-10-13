import Container from '../controllers/container.js';
import Product from '../models/product.js';
import express from 'express';
const { Router } = express;

const router = Router();

const products = new Container('data/products.json');

/////// HTTP request methods routing //////

router.get('/', (req, res) => {
    products.getAll()
        .then((products)=>(products)?
            res.status(302).send(products) : 
            res.status(404).send('Error: no products found'));
})

router.get('/:id', (req, res) => {
    products.getById(parseInt(req.params.id))
        .then((product)=>(product.length === 0)?
            res.status(404).send('Error: no matches found') :
            res.status(302).send(product));
})

router.post('/', (req, res) => {
    if(!(req.body)){
        res.status(400).send('Error: body is empty');
        return
    }
    const prod = new Product(req.body);
    res.status(102);
    products.save(prod)
        .then((id)=> res.status(201).send({ id }))
        .catch( error => console.log(error));
})

router.put('/:id', (req, res) => {
    if(!(req.body)){
        res.status(400).send('Error: body is empty');
        return
    }
    const prod = new Product(req.body);
    res.status(202);
    products.overwriteById(parseInt(req.params.id), prod)
        .then( _ =>res.status(200).send())
        .catch( error => console.log(error));
})

router.delete('/:id', (req, res) => {
    res.status(102);
    products.deleteById(parseInt(req.params.id))
        .then( () =>res.status(200).send())
        .catch( error => console.log(error));
})

export {
    router,
    products,
}
export default router;
