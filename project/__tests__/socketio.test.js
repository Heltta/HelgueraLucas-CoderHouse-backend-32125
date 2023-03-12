import { Server as HttpServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';
import Client from 'socket.io-client';

//////////// CLI Args & dotENV ////////
import {
    SERVER_INTERFACE,
    SERVER_PORT as auxiliarServerPort,
} from '../src/config/dotEnVar.js';
import { server_port as primaryServerPort } from '../src/config/CLIarguments.js';
const PORT = primaryServerPort || auxiliarServerPort;

describe('Socket io basics', () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const app = express();
        const httpServer = HttpServer(app);
        io = new Server(httpServer);

        //////////// Turn on server ///////////
        httpServer.listen(PORT, SERVER_INTERFACE, () => {
            const port = httpServer.address().port;
            const address = httpServer.address().address;
            clientSocket = new Client(`http://${address}:${port}`);
            io.on('connection', (socket) => {
                serverSocket = socket;
            });
            clientSocket.on('connect', done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    test('should emit message to clients', (done) => {
        clientSocket.on('hello', (arg) => {
            expect(arg).toBe('world');
            done();
        });
        serverSocket.emit('hello', 'world');
    });

    test('should emit message to clients (with ack)', (done) => {
        serverSocket.on('hi', (cb) => {
            cb('hola');
        });
        clientSocket.emit('hi', (arg) => {
            expect(arg).toBe('hola');
            done();
        });
    });
});
