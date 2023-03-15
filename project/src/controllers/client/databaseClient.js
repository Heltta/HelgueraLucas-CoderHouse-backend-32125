/**
 * Abstract Class DatabaseClient.
 *
 * @class DatabaseClient
 */
class DatabaseClient {
    constructor() {
        if (this.constructor == DatabaseClient) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    async connnect() {
        throw new Error('Operation "connect" is not implemented');
    }
    async disconnect() {
        throw new Error('Operation "disconnect" is not implemented');
    }
}

export default DatabaseClient;
