import Container from '../daos/cartsDao.js';
import Cart from '../models/cart.js';
import Error from '../models/error.js';
import express from 'express';
import logger from '../config/logger.js';
const { Router } = express;

const router = Router();

/////// Containers ////////////////////////
const storedCarts = Container.getInstance();
import { products as prodDB } from './productsAPI.js';

/////// HTTP request methods routing //////

router.post('/', (req, res) => {
    // Create (and save) a cart and returns its ID
    if (!req.body) {
        res.status(400).send(
            new Error({
                code: 400,
                description: 'Error: body is empty',
            })
        );
        return;
    }
    const cart = new Cart(req.body);
    res.status(102);
    storedCarts
        .save(cart)
        .then((id) => res.status(201).send({ id }))
        .catch((error) => logger.error(error));
});

router.delete('/:id', (req, res) => {
    // Delete a cart which id is send as parameter
    res.status(102);
    storedCarts
        .deleteById(req.params.id)
        .then(() => res.status(200).send())
        .catch((error) => logger.error(error));
});

router.get('/:id/products', async (req, res) => {
    // Get all products stored in a cart wich id is send as parameter
    try {
        const cart = await storedCarts.getById(req.params.id);
        if (cart === null || cart === undefined) {
            res.status(404).send(
                new Error({
                    code: 404,
                    description: 'Error: no matches found',
                })
            );
        } else {
            cart.products
                ? res.status(200).send(cart.products)
                : res.status(500).send(
                      new Error({
                          code: 500,
                          description: 'Error: Cart products is nullish',
                      })
                  );
        }
    } catch (error) {
        logger.error(error);
    }
});

router.put('/:id/products', async (req, res) => {
    // Add products to a cart wich ID is send as parameter
    // Products are send inside request body as a list of its IDs

    // If body is not an array, the code will break
    if (!Array.isArray(req.body)) {
        res.status(400).send(
            new Error({
                code: 400,
                description: "Error: Request's body is not an Array",
            })
        );
        return;
    }

    try {
        const cartID = req.params.id;
        let cart;
        try {
            cart = await storedCarts.getById(cartID);
        } catch (error) {
            logger.error(error);
            res.status(500).send(
                new Error({
                    code: 500,
                    description: 'Error: Internal error while searching cart',
                })
            );
        }
        // Cart must exist
        if (!cart) {
            res.status(404).send(
                new Error({
                    code: 404,
                    description: 'Error: no cart matches found',
                })
            );
        }
        // Avoid working with a nullish
        else if (!cart?.products) {
            res.status(500).send(
                new Error({
                    code: 500,
                    description: 'Error: Cart products is nullish',
                })
            );
        } else {
            const cartProd = [...cart.products];

            // Map method returns an array of promises
            // and Promise.all packs them into a unique promise
            let newProducts;
            try {
                newProducts = await Promise.all(
                    req.body.map(async (ID) => {
                        const prod = await prodDB.getById(ID);
                        return prod;
                    })
                );
            } catch (error) {
                logger.error(error);
                res.status(500).send(
                    new Error({
                        code: 500,
                        description:
                            'Error: There was a problem while fetching products',
                    })
                );
                return;
            }

            // Don't add products if some are duplicated
            if (
                cartProd.some((prod) =>
                    newProducts.some((nProd) => nProd.id === prod.id)
                )
            ) {
                res.status(400).send(
                    new Error({
                        code: 400,
                        description: 'Error: Some products already in cart',
                    })
                );
            } else {
                const updatedCart = new Cart({
                    id: cart.id,
                    products: [...cartProd, ...newProducts],
                });
                storedCarts.overwriteById(cart.id, updatedCart);
                res.status(202);
                res.status(200).send({ id: cartID });
            }
        }
    } catch (error) {
        logger.error(error);
        res.status(500).send(
            new Error({
                code: 500,
                description: 'Error: Internal Server Error',
            })
        );
    }
});

router.delete('/:id/products/:id_prod', async (req, res) => {
    // Delete a cart which id is send as parameter

    const cartID = req.params.id;
    const prodID = req.params.id_prod;

    // Check for correct parameters
    if (!(cartID && prodID)) {
        res.status(400).send(
            new Error({
                code: 400,
                description: 'Error: Some request parameters are not a number',
            })
        );
        return;
    }

    try {
        const cart = await storedCarts.getById(cartID);
        // Cart must exist
        if (cart.length === 0) {
            res.status(404).send(
                new Error({
                    code: 404,
                    description: 'Error: No cart matches found',
                })
            );
        }
        // Avoid working with a nullish
        else if (!cart[0].products) {
            res.status(500).send(
                new Error({
                    code: 500,
                    description: 'Error: Cart products is nullish',
                })
            );
        }
        // Check if product is in cart
        else if (!cart[0].products.some((prod) => prod.id === prodID)) {
            res.status(404).send(
                new Error({
                    code: 404,
                    description: 'Error: No product matches found for given ID',
                })
            );
        } else {
            res.status(202);
            const cartProd = cart[0].products.filter(
                (prod) => prod.id != prodID
            );
            const filteredCart = new Cart({
                id: cartID,
                products: cartProd,
            });

            try {
                await storedCarts.overwriteById(cartID, filteredCart);
                res.status(200).send(filteredCart);
            } catch (error) {
                res.status(500).send(
                    new Error({
                        code: 500,
                        description: 'Error: Internal Server Error',
                    })
                );
                logger.error(error);
            }
        }
    } catch (error) {
        res.status(500).send(
            new Error({
                code: 500,
                description: 'Error: Internal Server Error',
            })
        );
        logger.error(error);
    }
    // storedCarts.deleteById(cartID)
    //     .then( () =>res.status(200).send())
    //     .catch( error => logger.error(error));
});

export default router;
