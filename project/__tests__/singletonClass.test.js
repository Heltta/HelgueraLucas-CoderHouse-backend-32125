import {
    describe,
    expect,
    test,
    afterAll
} from '@jest/globals';


import ContainerMongoDB from '../src/controllers/containerMongoDB.js';
import CartsGeneralDao from '../src/daos/cartsDao.js';
import ProductsGeneralDao from '../src/daos/productsDao.js';
import UsersGeneralDao from '../src/daos/usersDao.js';

describe("Singleton patron", () => {
    describe.each([
        [CartsGeneralDao.name, CartsGeneralDao],
        [ProductsGeneralDao.name, ProductsGeneralDao],
        [UsersGeneralDao.name, UsersGeneralDao],
    ])(`%s.getInstance()`, (className, singletonClass) => {

        test("Properties", () => {

            expect(
                singletonClass.getInstance
            ).toBeTruthy();
        })

        //este test es el que da problemas de openHandles
        test("Output", () => {

            const classInstance = singletonClass.getInstance();
            expect(
                classInstance
            ).toBeDefined();
            expect(
                classInstance
            ).not.toBeNull();
            expect(
                classInstance
            ).toBeInstanceOf(singletonClass);
            expect(
                classInstance
            ).toBe(singletonClass.getInstance());
            expect(
                classInstance.coll
            ).toBeDefined();
            expect(
                typeof classInstance.coll
            ).toBe("string");
        })
        afterAll(()=>{ singletonClass.disconnectDB();}); //prevents openHandles

    });
});
