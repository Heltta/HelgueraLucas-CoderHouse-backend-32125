import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';
import supertest from 'supertest';
import { isValidObjectId } from 'mongoose';

//////////// Helpers //////////////////
import {
    generateProductParameters,
    randomMongoObjId,
} from '../helpers/parameter.generator.js';

//////////// Test subjects ////////////
import { app } from '../../src/app.js';
import ContainerMongoDB from '../../src/controllers/containerMongoDB.js';
import Product from '../../src/models/product.js';
const exampleProduct = new Product(generateProductParameters());

afterAll(() => {
    ContainerMongoDB.disconnectDB();
});

describe('/api/products', () => {
    describe('/', () => {
        describe('GET', () => {
            // should respond with a 302 code and a json of all products stored at the DataBase
            // if no products are found, should respond with a 404 error with the message "Error: no products found"
            // if an internal error happends, should respond with a 500 error with the message "Error: Internal Server Error"
            // should specify json in the content type header

            let response;
            beforeAll(async () => {
                // save product at DB for testing
                await supertest(app).post('/api/products').send(exampleProduct);

                // send and save http GET request
                response = await supertest(app).get('/api/products');
            });

            afterAll(async () => {
                // delete saved product from database
                await supertest(app).del(`/api/products/${exampleProduct.id}`);
            });

            test('Should respond with a 302 status code', () => {
                expect(response).toHaveProperty('statusCode', 302);
            });

            test('Should specify json as the content type in the http header', () => {
                expect(response.headers['content-type']).toEqual(
                    expect.stringContaining('json')
                );
            });

            test('Should respond with an array in the http body', () => {
                expect(response.body).toBeInstanceOf(Array);
            });

            test('Should respond with an array which contains a saved product in the http body', () => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            _id: exampleProduct.id,
                            code: exampleProduct.code,
                        }),
                    ])
                );
            });
        });

        describe('POST', () => {
            // should respond with a 201 code and a json object with the product's id
            // should save the product at the database
            // should respond with the same id as the sended object
            // should specify json in the content type header

            let response;
            beforeAll(async () => {
                // send and save http request
                response = await supertest(app)
                    .post('/api/products')
                    .send(exampleProduct);
            });

            afterAll(async () => {
                // delete saved product from database
                await supertest(app).del(`/api/products/${exampleProduct.id}`);
            });

            test('Should respond with a 201 status code', () => {
                expect(response).toHaveProperty('statusCode', 201);
            });

            test('Should specify json as the content type in the http header', () => {
                expect(response.headers['content-type']).toEqual(
                    expect.stringContaining('json')
                );
            });

            test('Should respond with an id from the mongo database in the http body', () => {
                expect(isValidObjectId(response.body.id)).toBe(true);
            });

            test('Should respond with the same id as the sended product id', () => {
                expect(response.body.id).toBe(exampleProduct.id);
            });
        });

        describe('PUT', () => {
            // should responde with a 501 code
            // should carry an error message of 'Error: The server does not support the functionality required to fulfill the request'

            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).put('/api/products');
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });

        describe('DELETE', () => {
            // should responde with a 501 code
            // should carry an error message of 'Error: The server does not support the functionality required to fulfill the request'

            let response;
            beforeAll(async () => {
                // send and save http request

                response = await supertest(app).delete('/api/products');
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });
    });

    describe('/:id', () => {
        describe('GET', () => {
            // should respond with a 302 code
            // if no products are found, should respond with a 404 error with the message "Error: no products found"
            // if an internal error happends, should respond with a 500 error with the message "Error: Internal Server Error"
            // should specify json in the content type header

            describe('No product match for id', () => {
                test.todo('Should respond with error code 404');
                test.todo(
                    'Should respond with message "Error: No product found'
                );
            });

            describe('Good request', () => {
                let response;
                beforeAll(async () => {
                    // save product at DB for testing
                    await supertest(app)
                        .post('/api/products')
                        .send(exampleProduct);

                    // send and save http GET request
                    response = await supertest(app)
                        .get(`/api/products/${exampleProduct.id}`)
                        .send(exampleProduct);
                });

                afterAll(async () => {
                    // delete saved product from database
                    await supertest(app).del(
                        `/api/products/${exampleProduct.id}`
                    );
                });

                test('Should respond with a 302 status code', () => {
                    expect(response).toHaveProperty('statusCode', 302);
                });

                test('Should specify json as the content type in the http header', () => {
                    expect(response.headers['content-type']).toEqual(
                        expect.stringContaining('json')
                    );
                });

                test('Should respond with an Object in the http body', () => {
                    expect(response.body).toBeInstanceOf(Object);
                });

                test('Should respond with a saved product with the requested id in the http body', () => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            _id: exampleProduct.id,
                            name: exampleProduct.name,
                            description: exampleProduct.description,
                            code: exampleProduct.code,
                            photo: exampleProduct.photo,
                            price: exampleProduct.price,
                            stock: exampleProduct.stock,
                        })
                    );
                });
            });
        });

        describe('POST', () => {
            // should respond with a 501 code
            // should carry an error message of 'Error: The server does not support the functionality required to fulfill the request'

            let response;
            beforeAll(async () => {
                // send and save http POST request
                response = await supertest(app)
                    .post(`/api/products/${exampleProduct.id}`)
                    .send(exampleProduct);
            });

            afterAll(async () => {
                // delete saved product from database
                await supertest(app).del(`/api/products/${exampleProduct.id}`);
            });

            test('Should respond with a 501 status code', () => {
                expect(response).toHaveProperty('statusCode', 501);
            });
        });

        describe('PUT', () => {
            // updates a product in the database

            describe('Empty request body', () => {
                let response;
                beforeAll(async () => {
                    // send and save http GET request
                    response = await supertest(app)
                        .put(`/api/products/${exampleProduct.id}`)
                        .send();
                });

                test('Should respond with error code 400', () => {
                    expect(response).toHaveProperty('statusCode', 400);
                });

                test('Should specify json as the content type in the http header', () => {
                    expect(response.headers['content-type']).toEqual(
                        expect.stringContaining('json')
                    );
                });

                test('Should respond with message "Error: body is empty"', () => {
                    expect(response.body).toHaveProperty(
                        'description',
                        'Error: body is empty'
                    );
                });
            });

            describe('Request lacks admin rights', () => {
                beforeAll(async () => {
                    // send and save http GET request
                    await supertest(app)
                        .put(`/api/products/${exampleProduct.id}`)
                        .send(exampleProduct);
                });

                afterAll(async () => {
                    // delete saved product from database
                    await supertest(app).del(
                        `/api/products/${exampleProduct.id}`
                    );
                });

                test.todo('Should respond with error code 403');
                test.todo(
                    'Should respond with message "Error: Client has no admin rights"'
                );
            });

            describe('No product match for id', () => {
                let response;
                const randomID = randomMongoObjId();
                beforeAll(async () => {
                    // send and save http POST request
                    response = await supertest(app)
                        .put(`/api/products/${randomID}`)
                        .send(exampleProduct);
                });

                afterAll(async () => {
                    // delete saved product from database
                    await supertest(app).del(`/api/products/${randomID}`);
                });

                test('Should respond with error code 404', () => {
                    expect(response).toHaveProperty('statusCode', 404);
                });
                test('Should respond with message "Error: No product found"', () => {
                    expect(response.body).toHaveProperty(
                        'description',
                        'Error: No product found'
                    );
                });
            });

            describe('Good request', () => {
                let response;
                beforeAll(async () => {
                    await supertest(app)
                        .post(`/api/products/`)
                        .send(exampleProduct);

                    // send and save http POST request
                    response = await supertest(app)
                        .put(`/api/products/${exampleProduct.id}`)
                        .send(generateProductParameters({ generateId: false }));
                });

                afterAll(async () => {
                    // delete saved product from database
                    await supertest(app).del(
                        `/api/products/${exampleProduct.id}`
                    );
                });

                test('Should respond with an http code 200', () => {
                    expect(response).toHaveProperty('statusCode', 200);
                });
                test('Should specify json as the content type in the http header', () => {
                    expect(response.headers['content-type']).toEqual(
                        expect.stringContaining('json')
                    );
                });
                test('Should respond with the number of matches in the http body', () => {
                    expect(response.body).toHaveProperty('matches');
                });
            });
        });

        describe('DELETE', () => {
            describe('Request lacks admin rights', () => {
                test.todo('Should respond with error code 403');
                test.todo(
                    'Should respond with message "Error: Client has no admin rights"'
                );
            });

            describe('Good request', () => {
                let response;
                beforeAll(async () => {
                    await supertest(app)
                        .post(`/api/products/`)
                        .send(exampleProduct);

                    // send and save http POST request
                    response = await supertest(app).delete(
                        `/api/products/${exampleProduct.id}`
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
});
