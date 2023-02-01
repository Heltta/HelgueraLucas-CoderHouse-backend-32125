import {
    describe,
    expect,
    test,
    afterAll,
    beforeAll
} from '@jest/globals';
import { faker } from "@faker-js/faker";
import supertest from 'supertest';


//////////// Server config ////////////
import {
    SERVER_INTERFACE,
    SERVER_PORT as auxiliarServerPort,
} from '../src/config/dotEnVar.js';
import { 
    server_port as primaryServerPort
} from '../src//config/CLIarguments.js';
import { 
    app,
} from '../src/app.js';
import ContainerMongoDB from '../src/controllers/containerMongoDB.js';

let server;
beforeAll((done) => {
    const PORT = primaryServerPort || auxiliarServerPort;
    server = app.listen(PORT, SERVER_INTERFACE, (err) => {
      if (err) return done(err);
       done();
    });
});

afterAll((done) => {
    ContainerMongoDB.disconnectDB();
    return server && server.close(done);
});

test('should pass the test', () => {
    expect(2).toBe(2);
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


