import { describe, expect, test } from '@jest/globals';

import Message from '../../src/models/message';
import User from '../../src/models/user';

import { generateMessageParameters } from '../helpers/parameter.generator';

describe('message properties', () => {
    describe('id', () => {
        describe('constructor is passed a falsy id', () => {
            test('new message should have an id', () => {
                expect(
                    new Message(
                        generateMessageParameters({ generateId: false })
                    )
                ).toHaveProperty('id', expect.anything());
            });
        });
        describe('constructor is passed a truthy id', () => {
            test('new message should have an id', () => {
                expect(
                    new Message(generateMessageParameters({ generateId: true }))
                ).toHaveProperty('id', expect.anything());
            });
        });
    });
    describe('timestamp', () => {
        describe('constructor is passed a falsy timestamp', () => {
            test('new message should have a timestamp', () => {
                expect(
                    new Message(
                        generateMessageParameters({ generateTimestamp: true })
                    )
                ).toHaveProperty('id', expect.anything());
            });
        });
        describe('constructor is passed a truthy timestamp', () => {
            test('new message should have a timestamp', () => {
                expect(
                    new Message(
                        generateMessageParameters({ generateTimestamp: false })
                    )
                ).toHaveProperty('id', expect.anything());
            });
        });
    });
    describe('user', () => {
        describe('constructor is passed a falsy user', () => {
            test('new message should have undefined as user value', () => {
                expect(
                    new Message({
                        ...generateMessageParameters(),
                        user: null,
                    })
                ).toHaveProperty('user', undefined);
            });
        });
        describe("constructor is passed a truthy user but it's not an instance of User", () => {
            test('new message have undefined as user value', () => {
                expect(
                    new Message({
                        ...generateMessageParameters(),
                        user: true,
                    })
                ).toHaveProperty('user', undefined);
            });
        });
        describe("constructor is passed a truthy user and it's an instance of User", () => {
            test('new message should have an user', () => {
                expect(new Message(generateMessageParameters())).toHaveProperty(
                    'user',
                    expect.any(User)
                );
            });
            test('new message user property should not share memory with user parameter', () => {
                const messageParameter = generateMessageParameters();
                expect(new Message(messageParameter).user).not.toBe(
                    messageParameter.user
                );
            });
        });
    });
    describe('content', () => {
        describe('constructor is passed a falsy content', () => {
            test('new message should have an empty string as content', () => {
                expect(
                    new Message({
                        ...generateMessageParameters(),
                        content: false,
                    })
                ).toHaveProperty('content', '');
            });
        });
        describe('constructor is passed a non string as content', () => {
            test('new message should have an empty string as content', () => {
                expect(
                    new Message({
                        ...generateMessageParameters(),
                        content: true,
                    })
                ).toHaveProperty('content', '');
            });
        });
        describe('constructor is passed a truthy content', () => {
            test('new message should have the passed string as content', () => {
                const messageParameter = generateMessageParameters();
                expect(new Message(messageParameter)).toHaveProperty(
                    'content',
                    messageParameter.content
                );
            });
        });
    });
});
