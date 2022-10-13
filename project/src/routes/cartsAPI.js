import Container from '../controllers/container.js';
import Cart from '../models/cart.js';
import express from 'express';
const { Router } = express;

const router = Router();

/////// Containers ////////////////////////
const carts = new Container('data/carts.json');
import {products as prodDB} from './productsAPI.js'


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

router.delete('/:id', (req, res) => {
    // Delete a cart which id is send as parameter
    res.status(102);
    carts.deleteById(parseInt(req.params.id))
        .then( () =>res.status(200).send())
        .catch( error => console.log(error));
})

router.get('/:id/products', async (req, res) => {
    // Get all products stored in a cart wich id is send as parameter
    try{
        const cart = await carts.getById(parseInt(req.params.id));
        if(cart.length === 0){
            res.status(404).send('Error: no matches found');
        }
        else{
            (cart[0].products)? 
                res.status(302).send(cart[0].products) :
                res.status(500).send('Error: Cart products is nullish');
        }
    } 
    catch (error) { console.log(error) }
})

export default router;
