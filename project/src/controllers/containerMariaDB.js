import myknex  from '../config/mariaDB.js';

class Container {
    constructor(tableName, modelClass){
        // Precondition: modelClass has as method for creating a table 
        // in the database

        this.db = myknex;

        this.tbl =  tableName;

        modelClass.createTable(tableName);
    }

    async #selectRows(objCondition = {}){
        // Select all rows from table stored at DB that pass a condition.
        // If not condition is passed, then return all table's rows.
        try{
            const rows = await 
                this.db.from(this.tbl)
                    .select("*")
                    .where(objCondition)
            
            return rows
        }
        catch(error) {
            console.log(error); throw error;
        };
    }

    async #insertRow(obj){
        // Insert object as a row into table
        const { id, ...objData } = obj;
        try{
            const id = await this.db(this.tbl).insert(objData);
            return id[0];
        }
        catch(error) {
            console.log(error); throw error;
        };
    }

    async #uptadeRows(objCondition,obj){
        // Update all rows from table stored at DB that pass a condition
        // from a data object and return updated fields
        try{
            for (const prop in obj) {
                if(!obj[prop]){
                    delete obj[prop];
                }
            }
            console.log(obj);
            const rows = await 
                this.db.from(this.tbl)
                    .update(obj)
                    .where(objCondition)

            return rows;
        }
        catch(error) {
            console.log(error); throw error;
        };
    }

    async #deleteRow(objCondition){
        // Delete a row from table using object syntax
        try{
            const id = await this.db(this.tbl).where(objCondition).del();
            return id;
        }
        catch(error) {
            console.log(error); throw error;
        };
    }

    async save(data){
        // Store object data as a row into table
        try{
            return await this.#insertRow(data)
        }
        catch(error) {
            console.log(error);
        }
    }

    async overwriteById(id, objData){
        // Update fields inside row with given id.
        // objData parameter contains the keys of the fields
        // and the new content of those.
        return await this.#uptadeRows({id: parseInt(id)}, objData);
    }
    
    async getById(id){
        //Recibe un id y devuelve el objeto con ese id, o [] si no está.
        const content = await this.#selectRows({id: parseInt(id)}); 
        return content
    }

    async getAll(){
        //Devuelve un array con los objetos presentes en el archivo.
        return await this.#selectRows();
    }

    async deleteById(id){
        // Delete element with given id;
        this.#deleteRow({id: parseInt(id)})
    }

    async deleteAll(){
        // Delete all elements from a table
        await this.#deleteRow(true);
    }
}

// export default Container;
export default Container;
