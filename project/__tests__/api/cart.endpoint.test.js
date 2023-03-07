import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';
import supertest from 'supertest';
import { isValidObjectId } from 'mongoose';
//////////// Helpers //////////////////
import {
    generateArrayOfRandomProducts,
    generateCartParameters,
} from '../helpers/parameter.generator.js';

//////////// Test subjects ////////////
import { app } from '../../src/app.js';
import ContainerMongoDB from '../../src/controllers/containerMongoDB.js';
import Product from '../../src/models/product.js';
import Cart from '../../src/models/cart.js';
const newCartConstParameters = generateCartParameters();
/**
 * Example of a "Cart" constructed with all parameters.
 *
 *
 * @type {Cart}
 */
const exampleCart = new Cart(newCartConstParameters);

afterAll(() => {
    ContainerMongoDB.disconnectDB();
});

describe('/api/cart', () => {
    describe('/', () => {
        describe('GET', () => {
            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).get('/api/cart');
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });

        describe('POST', () => {
            let response;
            let getResponse;
            beforeAll(async () => {
                // send and save http request
                response = await supertest(app)
                    .post('/api/cart')
                    .send(exampleCart);
                getResponse = await supertest(app).get(
                    `/api/cart/${exampleCart.id}/products`
                );
            });

            afterAll(async () => {
                // delete saved product from database
                // await supertest(app).del(`/api/cart/${exampleCart.id}`);
            });
            test('Should respond with a 201 status code', () => {
                expect(response).toHaveProperty('statusCode', 201);
            });
            test('Should specify json as the content type in the http header', () => {
                expect(response.headers['content-type']).toEqual(
                    expect.stringContaining('json')
                );
            });
            test('Should respond with a mongo id inside body', () => {
                expect(isValidObjectId(response?.body?.id)).toBe(true);
            });
            test('Should respond with same id as the send Cart inside body', () => {
                expect(response?.body?.id).toBe(exampleCart.id);
            });
            test('Should create sended Cart at Mongo DB', async () => {
                expect(getResponse?.body).toBeInstanceOf(Array);
                expect(
                    getResponse?.body.map((rawObj) => new Product(rawObj))
                ).toEqual(exampleCart.products);
            });
        });

        describe('PUT', () => {
            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).get('/api/cart');
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });

        describe('DELETE', () => {
            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).delete('/api/cart');
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });
    });

    describe('/:id', () => {
        describe('GET', () => {
            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).get(
                    `/api/cart/${exampleCart.id}`
                );
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });

        describe('POST', () => {
            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).post(
                    `/api/cart/${exampleCart.id}`
                );
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });

        describe('PUT', () => {
            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).put(
                    `/api/cart/${exampleCart.id}`
                );
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });

        describe('DELETE', () => {
            describe('Good request', () => {
                let response;
                beforeAll(async () => {
                    await supertest(app).post(`/api/cart/`).send(exampleCart);

                    // send and save http POST request
                    response = await supertest(app).delete(
                        `/api/cart/${exampleCart.id}`
                    );
                });

                test('Should respond with http code 200', () => {
                    expect(response).toHaveProperty('statusCode', 200);
                });

                test('Should have an empty body http header', () => {
                    expect(response.body).toEqual({});
                });
            });
        });
    });

    describe('/:id/products', () => {
        describe('GET', () => {
            let response;
            beforeAll(async () => {
                // send and save http request
                await supertest(app).post('/api/cart').send(exampleCart);

                response = await supertest(app).get(
                    `/api/cart/${exampleCart.id}/products`
                );
            });

            afterAll(async () => {
                // delete saved cart from database
                await supertest(app).delete(`/api/cart/${exampleCart.id}`);
            });

            test('Should respond with a 200 status code', () => {
                expect(response).toHaveProperty('statusCode', 200);
            });

            test('Should specify json as the content type in the http header', () => {
                expect(response.headers['content-type']).toEqual(
                    expect.stringContaining('json')
                );
            });

            test('Should respond with an array in the http body', () => {
                expect(response.body).toBeInstanceOf(Array);
            });

            test('Should respond with the given list of products in the http body', async () => {
                expect(
                    response?.body.map((rawObj) => new Product(rawObj))
                ).toEqual(exampleCart.products);
            });
        });

        describe('POST', () => {
            let response;
            beforeAll(async () => {
                // send and save http request
                response = await supertest(app).post(
                    `/api/cart/${exampleCart.id}/products`
                );
            });

            afterAll(async () => {
                // delete saved product from database
                await supertest(app).del(`/api/cart/${exampleCart.id}`);
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });

        describe('PUT', () => {
            const updatedProducts = generateArrayOfRandomProducts(
                Math.floor(Math.random() * 2) + 2
            );
            let response;
            beforeAll(async () => {
                // send and save http request
                await supertest(app).post('/api/cart').send(exampleCart);
                await Promise.allSettled(
                    updatedProducts.map(
                        async (product) =>
                            await supertest(app)
                                .post('/api/products')
                                .send(product)
                    )
                );

                response = await supertest(app)
                    .put(`/api/cart/${exampleCart.id}/products`)
                    .send(updatedProducts.map((prod) => prod.id));
            });

            afterAll(async () => {
                // delete saved product from database
                await supertest(app).delete(`/api/cart/${exampleCart.id}`);
                await Promise.allSettled(
                    updatedProducts.map(
                        async (product) =>
                            await supertest(app).delete(
                                `/api/products/${product.id}`
                            )
                    )
                );
            });

            test('Should respond with a 200 status code', () => {
                expect(response).toHaveProperty('statusCode', 200);
            });

            test('Should specify json as the content type in the http header', () => {
                expect(response.headers['content-type']).toEqual(
                    expect.stringContaining('json')
                );
            });

            test('Should respond with an id from the mongo database in the http body', () => {
                expect(isValidObjectId(response.body.id)).toBe(true);
            });

            test('Should respond with the same id as the updated cart id', () => {
                expect(response.body).toHaveProperty('id', exampleCart.id);
            });
        });

        describe('DELETE', () => {
            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).delete(
                    `/api/cart/${exampleCart.id}/products`
                );
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });
    });

    describe('/:id/products/:id_prod', () => {});
});
