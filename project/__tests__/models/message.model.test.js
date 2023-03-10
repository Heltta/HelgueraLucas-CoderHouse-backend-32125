import { describe, expect, test } from '@jest/globals';

import Message from '../../src/models/message';
import User from '../../src/models/user';

describe('message properties', () => {
    describe('id', () => {
        describe('constructor is passed a falsy id', () => {
            test.todo('new message should have an id');
        });
        describe('constructor is passed a truthy id', () => {
            test.todo('new message should have an id');
        });
    });
    describe('timestamp', () => {
        describe('constructor is passed a falsy timestamp', () => {
            test.todo('new message should have an timestamp');
        });
        describe('constructor is passed a truthy timestamp', () => {
            test.todo('new message should have an timestamp');
        });
    });
    describe('user', () => {
        describe('constructor is passed a falsy user', () => {
            test.todo('new message should have an user');
        });
        describe("constructor is passed a truthy user but it's not an instance of User", () => {
            test.todo('new message should have an user');
        });
        describe("constructor is passed a truthy user and it's an instance of User", () => {
            test.todo('new message should have an user');
        });
    });
});
