import test from "node:test"
import assert from 'node:assert/strict';
import { mailTemplateUserReg } from '../src/lib/emailSender.js';
import { faker } from "@faker-js/faker";

test('mailTemplateUserReg({}) does not include \"undefined\"', _ => {
    const mailContent = mailTemplateUserReg({});
    assert.strictEqual(mailContent.includes("undefined"), false)
})

const mockRegistration = {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    age: faker.datatype.number({
        min: 0,
        max: 199,
    }),
    phone:faker.phone.number(),
    password: faker.internet.password()
};


test('mailTemplateUserReg(RegMock) includes each data field', _ => {
    const mailContent = mailTemplateUserReg(mockRegistration);
    assert.strictEqual(mailContent.includes("no data"), false)
})