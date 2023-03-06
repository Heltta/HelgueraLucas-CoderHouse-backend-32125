import { describe, expect, test } from '@jest/globals';
import { faker } from '@faker-js/faker';

import Cart from '../src/models/cart.js';
import Product from '../src/models/product.js';
import { Types } from 'mongoose';

const newCartConstParameters = {
    id: faker.database.mongodbObjectId(),
    products: ((iterations) => {
        const list = [];
        for (let i = 0; i < iterations; i++) {
            list.push(
                new Product({
                    id: faker.database.mongodbObjectId(),
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    code: faker.random.alphaNumeric(),
                    photo: faker.image.imageUrl({ randomize: true }),
                    price: faker.datatype.number(),
                    stock: faker.datatype.number(),
                })
            );
        }
        return list;
    })(Math.floor(Math.random() * 6) + 1),
};

describe('constructor', () => {
    describe('is given a falsy in "products" parameter', () => {
        /**
         * Example of a "Cart" constructed without all parameters.
         *
         *
         * @type {Cart}
         */
        const cartExample = new Cart({
            id: newCartConstParameters.id,
            products: [],
        });

        test('new cart should have a valid mongo id', () => {
            expect(Types.ObjectId.isValid(cartExample.id)).toBe(true);
        });
        test('new cart should contain an array at "products"', () => {
            expect(cartExample?.products).toBeInstanceOf(Array);
        });
        test('new cart should contain an empty array at "products"', () => {
            expect(cartExample?.products).toHaveProperty('length', 0);
        });
    });

    describe('is given a list of products in "products" parameter', () => {
        /**
         * Example of a "Cart" constructed with all parameters.
         *
         *
         * @type {Cart}
         */
        const cartExample = new Cart(newCartConstParameters);

        test('new cart should have a valid mongo id', () => {
            expect(Types.ObjectId.isValid(cartExample.id)).toBe(true);
        });
        test('new cart should contain an array at "products"', () => {
            expect(cartExample?.products).toBeInstanceOf(Array);
        });
        test('new cart should contain a non empty array at "products"', () => {
            expect(cartExample?.products.length).not.toBe(0);
        });
        test('new cart should contain an array of products at "products"', () => {
            expect(
                cartExample?.products.every((e) => e instanceof Product)
            ).toBeTruthy();
        });
    });
});
