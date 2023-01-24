import {describe, expect, test} from '@jest/globals';
// import assert from 'node:assert/strict';
import { mailTemplateUserReg } from '../src/lib/emailSender.js';
import { faker } from "@faker-js/faker";


test('mailTemplateUserReg({}) does not include \"undefined\"', () => {
    const mailContent = mailTemplateUserReg({});
    expect(mailContent.includes("undefined")).toBe(false)
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


test('mailTemplateUserReg(RegMock) includes each data field', () => {
    const mailContent = mailTemplateUserReg(mockRegistration);
    expect(mailContent.includes("no data")).toBe(false)
})