import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';
import { Schema } from 'mongoose';
//////////// Helpers //////////////////
import { generateMessageParameters } from '../helpers/parameter.generator.js';
//////////// Test subjects ////////////
import Message from '../../src/models/message';
import MessagesGeneralDao from '../../src/daos/messagesDao';

describe('messagesDao mongoSchema', () => {
    test('should return a mongo schema', () => {
        expect(MessagesGeneralDao.mongoSchema()).toBeInstanceOf(Schema);
    });
});

describe('messagesDao CRUD methods', () => {
    let messagesDao;
    beforeAll(() => {
        messagesDao = MessagesGeneralDao.getInstance();
    });
    afterAll(() => {
        MessagesGeneralDao.disconnectDB();
    });

    describe('getById()', () => {
        const randomMessage = new Message(generateMessageParameters());
        let databaseResponse;
        beforeAll(async () => {
            // save product at DB for testing
            await messagesDao.save(randomMessage);

            // getById
            databaseResponse = await messagesDao.getById(randomMessage.id);
        });

        afterAll(async () => {
            // delete saved product from database
            await messagesDao.deleteById(randomMessage.id);
        });
        test('should return a message', () => {
            expect(databaseResponse).toEqual(randomMessage);
        });
    });
});
