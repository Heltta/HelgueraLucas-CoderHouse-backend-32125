import Container from '../daos/productsDao.js';
import Product from '../models/product.js';
import Error from '../models/error.js';
import adminRights from '../config/admin.js';
import express from 'express';
const { Router } = express;
import logger from '../config/logger.js';

const router = Router();

const products = Container.getInstance();

/////// HTTP request methods routing //////

router.get('/', (req, res) => {
    products
        .getAll()
        .then((products) =>
            products
                ? res.status(302).send(products)
                : res.status(404).send(
                      new Error({
                          code: 404,
                          description: 'Error: no products found',
                      })
                  )
        )
        .catch((error) => {
            res.status(500).send(
                new Error({
                    code: 500,
                    description: 'Error: Internal Server Error',
                })
            );
            logger.log('error', JSON.stringify(error));
        });
});

router.get('/:id', (req, res) => {
    products
        .getById(req.params.id)
        .then((product) =>
            product
                ? res.status(302).send(product)
                : res.status(404).send(
                      new Error({
                          code: 404,
                          description: 'Error: no matches found',
                      })
                  )
        )
        .catch((error) => {
            res.status(500).send(
                new Error({
                    code: 500,
                    description: 'Error: Internal Server Error',
                })
            );
            logger.log('error', JSON.stringify(error));
        });
});

router.post('/', (req, res) => {
    if (!req.body) {
        res.status(400).send(
            new Error({
                code: 400,
                description: 'Error: body is empty',
            })
        );
        return;
    } else if (!adminRights) {
        res.status(403).send(
            new Error({
                code: 400,
                description: 'Error: Client has no admin rights',
            })
        );
        return;
    }
    const prod = new Product(req.body);
    res.status(102);
    products
        .save(prod)
        .then((id) => res.status(201).send({ id }))
        .catch((error) => {
            res.status(500).send(
                new Error({
                    code: 500,
                    description: 'Error: Internal Server Error',
                })
            );
            logger.log('error', JSON.stringify(error));
        });
});

router.put('/:id', async (req, res) => {
    if (!(req.body && Object.keys(req.body).length)) {
        res.status(400).send(
            new Error({
                code: 400,
                description: 'Error: body is empty',
            })
        );
        return;
    } else if (!adminRights) {
        res.status(403).send(
            new Error({
                code: 400,
                description: 'Error: Client has no admin rights',
            })
        );
        return;
    }
    const prod = new Product(req.body);
    res.status(202);

    try {
        const updateResult = await products.overwriteById(req.params.id, prod);
        if (updateResult !== undefined) {
            res.status(200).send({ matches: updateResult });
        } else {
            res.status(404).send(
                new Error({
                    code: 404,
                    description: 'Error: No product found',
                })
            );
            return;
        }
    } catch (error) {
        res.status(500).send(
            new Error({
                code: 500,
                description: 'Error: Internal Server Error',
            })
        );
        logger.log('error', JSON.stringify(error));
    }
});

router.delete('/:id', (req, res) => {
    if (!adminRights) {
        res.status(403).send(
            new Error({
                code: 400,
                description: 'Error: Client has no admin rights',
            })
        );
        return;
    }
    res.status(102);
    products
        .deleteById(req.params.id)
        .then(() => res.status(200).send())
        .catch((error) => {
            res.status(500).send(
                new Error({
                    code: 500,
                    description: 'Error: Internal Server Error',
                })
            );
            logger.log('error', JSON.stringify(error));
        });
});

export { router, products };
export default router;
