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

describe.skip("/api/products", () =>{

    describe.skip("GET", ()=>{

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


