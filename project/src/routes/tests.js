import {
    Router
} from 'express';
import Product from '../models/product.js';

//////////// Dev. libraries /////////////
import { faker } from '@faker-js/faker';

const testsRouter = Router();


//-- test with faker.js --/
testsRouter.get('/productlist', (req, res) => {
    const fakeProducts = [];
    for(let i=0;i<5;i++){
        const fakeProd = new Product({
            id: faker.datatype.number(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.datatype.uuid(),
            photoURL: faker.image.imageUrl(),
            price: faker.commerce.price(),
            stock: faker.datatype.number({ min: 100, max: 8000})
        })
        fakeProducts.push(fakeProd);
    };
    res.status(302).send(fakeProducts);
})

export default testsRouter
