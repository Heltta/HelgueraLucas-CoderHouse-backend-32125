import {
    describe,
    expect,
    test
} from '@jest/globals';
import { faker } from "@faker-js/faker";

import Product from '../src/models/product.js';
import {
    Types
} from 'mongoose';



const newProductConstParameters = {
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(),
    photo: faker.image.imageUrl({randomize: true}),
    price: faker.datatype.number(),
    stock: faker.datatype.number(),
}

/**
 * Example of an "Product" constructed with al parameters.
 * 
 * @type {Product}
 */
const productExample = new Product(newProductConstParameters);

describe("timestamp", ()=>{

    test("Should be defined", () => {

        expect(
            productExample
        ).toHaveProperty("timestamp");
    });

    test("Should be a Date object", () => {

        expect(
            productExample.timestamp
        ).toBeInstanceOf(Date);
    });

    test.skip("Should have ISO 8601 format for dates", () => {
        
    });
});

describe("id", () => {

    test("Should be defined", () => {

        expect(
            productExample
        ).toHaveProperty("id");
    });

    test("Should be a string", () => {

        expect(
            typeof productExample.id
        ).toBe("string");
    });

    test("Should be a valid mongo Id", () => {

        expect(
            Types.ObjectId(productExample.id).toString()
        ).toBe(productExample.id);
    });

    test("Should be equal to constructor param.id", () => {

        expect(
            productExample.id
        ).toBe(newProductConstParameters.id);
    });

    test("Should be assigned as the result of a Destructuring assignment", () => {

        expect(
            { ...productExample}
        ).toHaveProperty("id");
    });
})

describe.each([
    "name",
    "description",
    "code",
    "photo",
])(`%s`, (key) => {

    test("Should be defined", () => {

        expect(
            productExample
        ).toHaveProperty(key);
    });

    test("Should be a String", () => {

        expect(
            typeof productExample[key]
        ).toBe("string");
    });

    test(`Should be equal to constructor param.${key}`, () => {

        expect(
            productExample[key]
        ).not.toHaveLength(0);
    });
});

describe.each([
    "price",
    "stock",
])(`%s`, (key) => {

    test("Should be defined", () => {

        expect(
            productExample
        ).toHaveProperty(key);
    });

    test("Should be a Number", () => {

        expect(
            typeof productExample[key]
        ).toBe("number");
    });

    test(`Should be equal to constructor param.${key}` , () => {

        expect(
            productExample[key]
        ).toBe(newProductConstParameters[key]);
    });
});
