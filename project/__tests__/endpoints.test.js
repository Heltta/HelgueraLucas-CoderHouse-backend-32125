import {
    describe,
    expect,
    test,
    afterAll,
    beforeAll,
} from '@jest/globals';
import { faker } from "@faker-js/faker";
import supertest from 'supertest';


//////////// Server config ////////////
import { 
    app,
} from '../src/app.js';
import ContainerMongoDB from '../src/controllers/containerMongoDB.js';
import Product from '../src/models/product.js';
import {
    isValidObjectId,
} from 'mongoose'

const exampleProduct = new Product({
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.random.alphaNumeric(),
    photo: faker.image.imageUrl({randomize: true}),
    price: faker.datatype.number(),
    stock: faker.datatype.number(),
});

afterAll(() => {
    ContainerMongoDB.disconnectDB();
});

describe("/api/products", () =>{

    describe('/', ()=>{

        describe("GET", ()=>{
            // should respond with a 302 code and a json of all products stored at the DataBase
            // if no products are found, should respond with a 404 error with the message "Error: no products found"
            // if an internal error happends, should respond with a 500 error with the message "Error: Internal Server Error"
            // should specify json in the content type header

            let response;
            beforeAll(async () => {

                // save product at DB for testing
                await supertest(app)
                    .post("/api/products")
                    .send(exampleProduct);

                // send and save http GET request
                response = await supertest(app)
                    .get("/api/products");
            })

            afterAll( async () => {

                // delete saved product from database
                await supertest(app).del(`/api/products/${exampleProduct.id}`)
            })

            test("Should respond with a 302 status code", () => {

                expect(
                    response
                ).toHaveProperty("statusCode", 302);
            });

            test("Should specify json as the content type in the http header", () => {
                
                expect(
                    response.headers['content-type']
                ).toEqual(expect.stringContaining('json'));
            });

            test("Should respond with an array in the http body", () => {

                expect(
                    response.body
                ).toBeInstanceOf(Array);
            });

            test("Should respond with an array which contains a saved product in the http body", () => {

                expect(response.body).toEqual(          
                    expect.arrayContaining([      
                        expect.objectContaining({
                            _id: exampleProduct.id,
                            code: exampleProduct.code,
                        })
                    ])
                );
            });
        });

        describe("POST", ()=>{
            // should respond with a 201 code and a json object with the product's id
            // should save the product at the database
            // should respond with the same id as the sended object
            // should specify json in the content type header

            let response;
            beforeAll(async () => {
                // send and save http request
                response = await supertest(app)
                    .post("/api/products")
                    .send(exampleProduct);
            })

            afterAll( async () => {

                // delete saved product from database
                await supertest(app).del(`/api/products/${exampleProduct.id}`)
            })

            test("Should respond with a 201 status code", () => {

                expect(
                    response
                ).toHaveProperty("statusCode", 201);
            });
            
            test("Should specify json as the content type in the http header", () => {
                
                expect(
                    response.headers['content-type']
                ).toEqual(expect.stringContaining('json'));
            });

            test("Should respond with an id from the mongo database in the http body", () => {

                expect(
                    isValidObjectId(response.body.id)
                ).toBe(true);
            })

            test("Should respond with the same id as the sended product id", () => {
                
                expect(
                    response.body.id
                ).toBe(exampleProduct.id);
            });
        });
    
        describe("PUT", ()=>{
            // should responde with a 501 code
            // should carry an error message of 'Error: The server does not support the functionality required to fulfill the request'


            let response;
            beforeAll(async () => {
                // send and save http request
                
                response = await supertest(app)
                    .put("/api/products");
            })
    
            test("Should respond with a 501 status code", () => {

                expect(
                    response
                ).toHaveProperty("statusCode", 501);
            });
        });
    
        describe("DELETE", ()=>{
            // should responde with a 501 code
            // should carry an error message of 'Error: The server does not support the functionality required to fulfill the request'

            let response;
            beforeAll(async () => {
                // send and save http request
                
                response = await supertest(app)
                    .delete("/api/products");
            })
    
            test("Should respond with a 501 status code", () => {

                expect(
                    response
                ).toHaveProperty("statusCode", 501);
            });
        });

    })

    describe('/:id', ()=>{
        
        describe("GET", ()=>{
            // should responde with a 302 code
            // if no products are found, should respond with a 404 error with the message "Error: no products found"
            // if an internal error happends, should respond with a 500 error with the message "Error: Internal Server Error"
            // should specify json in the content type header

            let response;
            beforeAll(async () => {

                // save product at DB for testing
                const postResponse = await supertest(app)
                    .post("/api/products")
                    .send(exampleProduct);

                // send and save http GET request
                response = await supertest(app)
                    .get(`/api/products/${exampleProduct.id}`)
                    .send(exampleProduct);
            });

            afterAll( async () => {

                // delete saved product from database
                await supertest(app).del(`/api/products/${exampleProduct.id}`)
            });

            test("Should respond with a 302 status code", () => {

                expect(
                    response
                ).toHaveProperty("statusCode", 302);
            });

            test("Should specify json as the content type in the http header", () => {
                
                expect(
                    response.headers['content-type']
                ).toEqual(expect.stringContaining('json'));
            });

            test("Should respond with an Object in the http body", () => {

                expect(
                    response.body
                ).toBeInstanceOf(Object);
            });

            test("Should respond with a saved product with the requested id in the http body", () => {

                expect(
                    response.body
                ).toEqual(
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

        describe("POST", ()=>{
            // should respond with a 501 code
            // should carry an error message of 'Error: The server does not support the functionality required to fulfill the request'    

            let response;
            beforeAll(async () => {

                // send and save http POST request
                response = await supertest(app)
                    .post(`/api/products/${exampleProduct.id}`)
                    .send(exampleProduct);
            })

            afterAll( async () => {

                // delete saved product from database
                await supertest(app).del(`/api/products/${exampleProduct.id}`)
            })

            test("Should respond with a 501 status code", () => {

                expect(
                    response
                ).toHaveProperty("statusCode", 501);
            });
        });
        
        describe.skip("PUT", ()=>{
    
        });
    
        describe.skip("DELETE", ()=>{
    
        });

    });

});

describe.skip("/api/cart", () =>{

    describe.skip("GET", ()=>{

    });

    describe.skip("POST", ()=>{

    });

    describe.skip("PUT", ()=>{

    });

    describe.skip("DELETE", ()=>{

    });

});

describe.skip("/api/random", () =>{

    describe.skip("GET", ()=>{

    });

    describe.skip("POST", ()=>{

    });

    describe.skip("PUT", ()=>{

    });

    describe.skip("DELETE", ()=>{

    });

});


