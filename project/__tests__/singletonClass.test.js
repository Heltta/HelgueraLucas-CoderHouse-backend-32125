import {describe, expect, test} from '@jest/globals';



import CartsGeneralDao from '../src/daos/cartsDao.js';
import ProductsGeneralDao from '../src/daos/productsDao.js';
import UsersGeneralDao from '../src/daos/usersDao.js';

describe("Integration tests for CartsGeneralDao", () => {

    [
        CartsGeneralDao,
        ProductsGeneralDao,
        UsersGeneralDao,
    ].forEach(singletonClass => {
        test(`${singletonClass.name}.getInstance()`, () => {
            expect(
                singletonClass.getInstance
            ).toBeTruthy();
            const classInstance= singletonClass.getInstance();
            expect(
                classInstance
            ).not.toBeNull();
            expect(
                classInstance
            ).toBeInstanceOf(singletonClass);
            expect(
                classInstance
            ).toBe(singletonClass.getInstance());
        });
    });
});
