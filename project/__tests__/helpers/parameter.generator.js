import { faker } from '@faker-js/faker';
import Product from '../../src/models/product.js';

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
            id: faker.database.mongodbObjectId(),
            ...dataParam,
        };
    } else {
        return dataParam;
    }
}
export function generateCartParameters() {
    return {
        id: faker.database.mongodbObjectId(),
        products: ((iterations) => {
            const list = [];
            for (let i = 0; i < iterations; i++) {
                list.push(new Product(generateProductParameters()));
            }
            return list;
        })(Math.floor(Math.random() * 2) + 2),
    };
}
export function randomMongoObjId() {
    return faker.database.mongodbObjectId();
}
