import Container from '../controllers/container.js';
import Product from '../models/product.js';
import Error from '../models/error.js';
import adminRights from '../config/admin.js';
import express from 'express';
const { Router } = express;

const router = Router();

const products = new Container('products', Product.tableFields);
// Test class methods
const {id, ...testData} = {
  id: 3,
  timestamp: 1665705788763,
  name: "asdfa!",
  description: "Descripcion placeholder del juego de mesa que esta muy bueno eh compralo",
  code: "asd897ertfaHTf",
  photo: "https://firebasestorage.googleapis.com/v0/b/homies-night-helguera-zanotta.appspot.com/o/images%2Fitems%2Fcaja_flick_em_up.webp?alt=media&token=fd85ffd4-79b4-4e73-8565-3f7754307a70",
  price: 19,
  stock: 8
}
products.getById(6).then( element => console.log(element));
products.getAll().then( element => console.log(element));


/////// HTTP request methods routing //////

router.get('/', (req, res) => {
    products.getAll()
        .then((products)=>(products)?
            res.status(302).send(products) : 
            res.status(404).send(new Error({
                code:404,
                description:'Error: no products found'
            })));
})

router.get('/:id', (req, res) => {
    products.getById(parseInt(req.params.id))
        .then((product)=>(product.length === 0)?
            res.status(404).send(new Error({
                code:404,
                description:'Error: no matches found'
            })) :
            res.status(302).send(product));
})

router.post('/', (req, res) => {
    if(!(req.body)){
        res.status(400).send(new Error({
            code:400,
            description:'Error: body is empty'
        }));
        return
    }
    else if(!adminRights){
        res.status(403).send(new Error({
            code:400,
            description:'Error: Client has no admin rights'
        }));
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
        res.status(400).send(new Error({
            code:400,
            description:'Error: body is empty'
        }));
        return
    }
    else if(!adminRights){
        res.status(403).send(new Error({
            code:400,
            description:'Error: Client has no admin rights'
        }));
        return
    }
    const prod = new Product(req.body);
    res.status(202);
    products.overwriteById(parseInt(req.params.id), prod)
        .then( _ =>res.status(200).send())
        .catch( error => console.log(error));
})

router.delete('/:id', (req, res) => {
    if(!adminRights){
        res.status(403).send(new Error({
            code:400,
            description:'Error: Client has no admin rights'
        }));
        return
    }
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
