import { describe, expect, test } from '@jest/globals';
import assert from 'node:assert/strict';
import { faker } from '@faker-js/faker';

import User from '../src/models/user.js';
import { Types } from 'mongoose';

const newUserConstParameters = {
    id: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.fullName(),
    age: faker.datatype.number({
        min: 0,
        max: 199,
    }),
    phone: faker.phone.number(),
    password: faker.internet.password(),
    privilegesCategory: faker.helpers.arrayElement(['user', 'admin']),
};

/**
 * Example of an "User" constructed with al parameters.
 *
 * Is a reference of how an object of class "User" should be if
 *     constructed with no nullish parameter.
 *
 * @type {User}
 */
const userExample = new User(newUserConstParameters);

describe('Users model properties', () => {
    test('No User property is undefined if no null parameter is given', () => {
        // Test for each of the parameters
        Object.keys(userExample).forEach((key) => {
            expect(userExample[key]).not.toBeUndefined();
        });
    });

    describe('Constructor is given some falsy parameter', () => {
        test('Throws error with empty object', () => {
            // Test for all parameters (empty object)
            assert.throws(() => new User({}), Error);
        });

        // Test for each of the parameters
        describe.each(Object.keys(newUserConstParameters))(
            `%s paramemeter`,
            (key) => {
                if (key === 'id') {
                    // id is not given if User was not fetched from DB
                    test(`Resolves if only ${key} is not given`, () => {
                        expect(
                            () =>
                                new User({
                                    ...newUserConstParameters,
                                    [key]: undefined,
                                })
                        ).not.toThrow();
                    });

                    test(`Creates object with defined ${key} property`, () => {
                        expect(
                            new User({
                                ...newUserConstParameters,
                                [key]: undefined,
                            })
                        ).toHaveProperty(key);
                    });

                    test(`Creates object with a string property named ${key}`, () => {
                        expect(
                            typeof new User({
                                ...newUserConstParameters,
                                [key]: undefined,
                            })[key]
                        ).toBe('string');
                    });

                    test(`Creates object with a valid mongo Id property named ${key}`, () => {
                        expect(
                            Types.ObjectId.isValid(
                                new User({
                                    ...newUserConstParameters,
                                    [key]: undefined,
                                })[key]
                            )
                        ).toBe(true);
                    });
                } else {
                    test(`Throws error if only ${key} is given`, () => {
                        expect(
                            () =>
                                new User({ [key]: newUserConstParameters[key] })
                        ).toThrow();
                    });
                }
            }
        );
    });
});

test('Method functionality tests', () => {
    assert.strictEqual(
        typeof userExample.fullName,
        'string',
        'fullName type should be String'
    );

    assert.strictEqual(
        userExample.fullName.length,
        userExample.firstName.length + userExample.lastName.length + 1,
        'fullName lenght should be equal first and last name plus one'
    );
});
