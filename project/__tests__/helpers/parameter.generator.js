import { faker } from '@faker-js/faker';
import Product from '../../src/models/product.js';

export function randomMongoObjId() {
    return faker.database.mongodbObjectId();
}

export function generateProductParameters({ generateId = true } = {}) {
    const dataParam = {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(),
        photo: faker.image.imageUrl({ randomize: true }),
        price: faker.datatype.number(),
        stock: faker.datatype.number(),
    };
    if (generateId) {
        return {
            id: randomMongoObjId(),
            ...dataParam,
        };
    } else {
        return dataParam;
    }
}

export function generateArrayOfRandomProducts(iterations) {
    const list = [];
    for (let i = 0; i < iterations; i++) {
        list.push(new Product(generateProductParameters()));
    }
    return list;
}

export function generateCartParameters() {
    return {
        id: randomMongoObjId(),
        products: generateArrayOfRandomProducts(
            Math.floor(Math.random() * 2) + 2
        ),
    };
}

export function generateUserParameters() {
    return {
        id: randomMongoObjId(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.fullName(),
        age: faker.datatype.number({
            min: 0,
            max: 199,
        }),
        phone: faker.phone.number(),
        password: faker.internet.password(),
        privilegesCategory: faker.helpers.arrayElement(['user', 'admin']),
    };
}
