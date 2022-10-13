import Container from '../controllers/container.js';
import Cart from '../models/cart.js';
import express from 'express';
const { Router } = express;

const router = Router();

const carts = new Container('data/carts.json');

/////// HTTP request methods routing //////

router.post('/', (req, res) =>{
    // Create (and save) a cart and returns its ID
    if(!(req.body)){
        res.status(400).send('Error: body is empty');
        return
    }
    const cart = new Cart(req.body);
    res.status(102);
    carts.save(cart)
        .then((id)=> res.status(201).send({ id }))
        .catch( error => console.log(error));
})

export default router;
