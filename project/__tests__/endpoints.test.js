import {
    describe,
    expect,
    test,
    afterAll,
} from '@jest/globals';
import { faker } from "@faker-js/faker";
import supertest from 'supertest';


//////////// Server config ////////////
import { 
    app,
} from '../src/app.js';
import ContainerMongoDB from '../src/controllers/containerMongoDB.js';


afterAll(() => {
    ContainerMongoDB.disconnectDB();
});

test('should pass the test', async () => {
    const response = await supertest(app).get("/");
    expect(
        response
    ).toHaveProperty("statusCode", 200);
});

describe("/api/products", () =>{

    describe("GET", ()=>{
        // should respond with a 302 code and a json of all products stored at the DataBase
        // if no products are found, should respond with a 404 error with the message "Error: no products found"
        // if an internal error happends, should respond with a 500 error with the message "Error: Internal Server Error"
        // should specify json in the content type header

        test("Should responde with a 302 status code", async () => {
            const response = await supertest(app).get("/api/products")
            expect(
                response
            ).toHaveProperty("statusCode", 302);
        });
    });

    describe.skip("POST", ()=>{

    });

    describe.skip("PUT", ()=>{

    });

    describe.skip("DELETE", ()=>{

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


