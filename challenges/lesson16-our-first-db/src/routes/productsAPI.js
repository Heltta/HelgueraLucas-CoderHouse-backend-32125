import Container from '../controllers/container.js';
import Product from '../models/product.js';
import Error from '../models/error.js';
import adminRights from '../config/admin.js';
import express from 'express';
const { Router } = express;

const router = Router();

const products = new Container('products', Product.tableFields);
// Test class methods
// products.save(new Product(
//   {
//     name: " Sheriff of Nottingham",
//     description: "Sell goods for profit, or risk losing it all by slipping contrabands in....",
//     code: "6584fas5dt487m56a",
//     photoURL: "https://firebasestorage.googleapis.com/v0/b/homies-night-helguera-zanotta.appspot.com/o/images%2Fitems%2Fcaja_sheriff_of_nottingham.webp?alt=media&token=00c30c1c-308f-4b28-b20f-81dd05a1109b",
//     price: 20,
//     stock: 18,
//   }
// ))
products.deleteById(4);

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
