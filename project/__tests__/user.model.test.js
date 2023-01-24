import {describe, expect, test} from '@jest/globals';
import assert from 'node:assert/strict';
import { faker } from "@faker-js/faker";

import User from "../src/models/user.js";

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
    privilegesCategory: faker.helpers.arrayElement([
        "user",
        "admin",
    ])
}

/**
 * Example of an "User" constructed with al parameters.
 * 
 * Is a reference of how an object of class "User" should be if 
 *     constructed with no nullish parameter.
 * 
 * @type {User}
 */
const userExample = new User(newUserConstParameters);

describe("Users model properties tests", () => {

    test("No User property is undefined if no null parameter is given", ()  => {
        // Test for each of the parameters
        Object.keys(userExample).forEach(key => {
            expect(userExample[key]).not.toBeUndefined()
        });
    })

    test("Constructor throws error if any parameter is nullish", () => {

        // Test for all parameters (empty object)
        assert.throws(
            _=>new User({}),
            Error,
            "Throws error with empty object"
        );
        
        // Test for each of the parameters
        Object.keys(newUserConstParameters).forEach(key => {
            assert.throws(
                _=>new User({[key]: newUserConstParameters[key] }),
                Error,
                `Throws error only if ${key} is given`
            );
            newUserConstParameters[key]
        });
        
    })

})

test("User class method functionality tests", () => {

    assert.strictEqual(
        typeof userExample.fullName,
        'string',
        "fullName type should be String"
    )

    assert.strictEqual(
        userExample.fullName.length,
        userExample.firstName.length + userExample.lastName.length + 1,
        "fullName lenght should be equal first and last name plus one"
    )
    
})