import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';

//////////// Server & Client //////////
import { Server as HttpServer } from 'http';
import express from 'express';
import Client from 'socket.io-client';

//////////// Test subjects ////////////
import MessagesGeneralDao from '../src/daos/messagesDao.js';
import Message from '../src/models/message.js';
import { generateMessageParameters } from './helpers/parameter.generator.js';
import setUpSocketServer from '../src/socket.js';

describe('chat', () => {
    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const app = express();
        const httpServer = HttpServer(app);
        io = setUpSocketServer(httpServer);

        //////////// Turn on server ///////////
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);

            io.on('connection', (socket) => {
                serverSocket = socket;
            });
            clientSocket.on('connect', done);
        });
    });

    afterAll(() => {
        MessagesGeneralDao.disconnectDB();
        io.close();
        clientSocket.close();
    });

    describe('client emmits message', () => {
        const message = new Message(generateMessageParameters);

        test('server should recieve message', (done) => {
            serverSocket.on('send_user_message', (arg, cb) => {
                cb(arg);
            });
            clientSocket.emit('send_user_message', message, (arg) => {
                expect(new Message(arg)).toEqual(message);
                done();
            });
        });
        test('server should store the new message', (done) => {
            serverSocket.on('chat', (arg, cb) => {
                cb(arg);
            });
            clientSocket.emit('chat', message, (arg) => {
                expect(new Message(arg)).toEqual(message);
                done();
            });
        });
        test.todo('server should emmit the message to all users');
    });

    describe('server emmits message', () => {
        test.todo('client should update view with message');
    });
});
