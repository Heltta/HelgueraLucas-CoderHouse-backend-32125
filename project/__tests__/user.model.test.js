import test from "node:test"
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

test("Users model properties tests", async (t) => {

    await t.test("No User property is undefined if no null parameter is given", _ => {
        assert.strictEqual(
            userExample?.id === undefined,
            false,
            "Assert if is \"id\" not undefined"
        );
        assert.strictEqual(
            userExample?.email === undefined,
            false,
            "Assert if is \"email\" not undefined"
        );
        assert.strictEqual(
            userExample?.firstName === undefined,
            false,
            "Assert if is \"firstName\" not undefined"
        );
        assert.strictEqual(
            userExample?.lastName === undefined,
            false,
            "Assert if is \"lastName\" not undefined"
        );
        assert.strictEqual(
            userExample?.age === undefined,
            false,
            "Assert if is \"age\" not undefined"
        );
        assert.strictEqual(
            userExample?.password === undefined,
            false,
            "Assert if is \"password\" not undefined"
        );
        assert.strictEqual(
            userExample?.privilegesCategory === undefined,
            false,
            "Assert if is \"privilegesCategory\" not undefined"
        );
    })

    await t.test("Constructor throws error if any parameter is nullish", _ => {

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

test("User class method functionality tests", _ => {

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