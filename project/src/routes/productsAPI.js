import Container from '../daos/productsDao.js';
import Product from '../models/product.js';
import Error from '../models/error.js';
import adminRights from '../config/admin.js';
import express from 'express';
const { Router } = express;

const router = Router();

const products = new Container();


/////// HTTP request methods routing //////

router.get('/', (req, res) => {
    products.getAll()
        .then((products)=>(products)?
            res.status(302).send(products) : 
            res.status(404).send(new Error({
                code:404,
                description:'Error: no products found'
            })))
        .catch( error => {
            res.status(500).send(new Error({
                code:500,
                description:'Error: Internal Server Error'
            }))
            console.log(error)
        });
})

router.get('/:id', (req, res) => {
    products.getById(req.params.id)
        .then((product)=>(product.length === 0)?
            res.status(404).send(new Error({
                code:404,
                description:'Error: no matches found'
            })) :
            res.status(302).send(product))
        .catch( error => {
            res.status(500).send(new Error({
                code:500,
                description:'Error: Internal Server Error'
            }))
            console.log(error)
        });
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
        .catch( error => {
            res.status(500).send(new Error({
                code:500,
                description:'Error: Internal Server Error'
            }))
            console.log(error)
        });
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
    products.overwriteById(req.params.id, prod)
        .then( _ =>res.status(200).send())
        .catch( error => {
            res.status(500).send(new Error({
                code:500,
                description:'Error: Internal Server Error'
            }))
            console.log(error)
        });
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
    products.deleteById(req.params.id)
        .then( () =>res.status(200).send())
        .catch( error => {
            res.status(500).send(new Error({
                code:500,
                description:'Error: Internal Server Error'
            }))
            console.log(error)
        });
})

export {
    router,
    products,
}
export default router;
