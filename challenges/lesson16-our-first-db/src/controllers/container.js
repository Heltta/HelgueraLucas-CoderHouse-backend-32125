// import * as fs from 'node:fs';
import { promises } from 'fs';
import myknex  from '../config/mariaDB.js';
// const knex = require('knex')(options);

class Container {
    constructor(tableName, fields){
        this.filePath = tableName;
        this.fields = [...fields] || [];
        
        this.tbl =  tableName;
        myknex.schema.hasTable(tableName).then( exists =>{
            if(exists){
                console.log("table already exists")
            }
            else{
                myknex.schema.createTable(tableName, table => {
                    fields.forEach( field => {
                        if(field.type === 'increments'){
                            table.increments(field.key);
                        }
                        else if (field.type === 'unsigned integer'){
                            table.integer(field.key).unsigned();
                        }
                        else if (field.type === 'unsigned biginteger'){
                            table.bigint(field.key).unsigned();
                        }
                        else if (field.type === 'integer'){
                            table.integer(field.key);
                        }
                        else if (field.type === 'biginteger'){
                            table.bigint(field.key);
                        }
                        else if (field.type === 'string'){
                            table.string(field.key);
                        }
                        else if (field.type === 'text'){
                            table.text(field.key);
                        }
                        else{
                            console.log(`Field type ${field.type} of ${field.key} not implemented`);
                        }
                    })
                })
                    .then(  _ => console.log("table created"))
                    .catch( (err) => {console.log(err); throw err})
                    .finally( _=> {
                        myknex.destroy();
                    });
            }
        })
    }

    async #selectRows(objCondition = true){
        // Select all rows from table stored at DB that pass a condition.
        // If not condition is passed, then return all table's rows.
        try{
            const rows = await 
                myknex.from(this.tbl)
                    .select("*")
                    .where(objCondition)
            
            return rows
        }
        catch(error) {
            console.log(error); throw error;
        }
        finally{
            myknex.destroy();
        };
    }

    async #insertRow(obj){
        // Insert object as a row into table
        const { id, ...objData } = obj;
        try{
            const id = await myknex(this.tbl).insert(objData);
            return id;
        }
        catch(error) {
            console.log(error); throw error;
        }
        finally{
            myknex.destroy();
        };
    }

    async #writeObj(obj){
        //Convierte a string un objeto y lo escribe en el archivo
        const stringifiedObj = JSON.stringify(obj);
        try{
            await promises.writeFile(
                this.filePath,
                stringifiedObj,
            )
        }
        catch(error) {
            console.log(error);
        }
    }

    async #uptadeRows(objCondition,data){
        // Update all rows from table stored at DB that pass a condition
        // from a data object and return updated fields
        try{
            const rows = await 
                myknex.from(this.tbl)
                    .update(data)
                    .where(objCondition)

            return rows;
        }
        catch(error) {
            console.log(error); throw error;
        }
        finally{
            myknex.destroy();
        };
    }

    async #deleteRow(objCondition){
        // Delete a row from table using object syntax
        try{
            const id = await myknex(this.tbl).where(objCondition).del();
            return id;
        }
        catch(error) {
            console.log(error); throw error;
        }
        finally{
            myknex.destroy();
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
        return await this.#uptadeRows({id:id}, objData);
    }
    
    async getById(id){
        //Recibe un id y devuelve el objeto con ese id, o [] si no está.
        const content = await this.#selectRows({id: id}); 
        const obj = content.filter(element => element.id === id);
        return obj
    }

    async getAll(){
        //Devuelve un array con los objetos presentes en el archivo.
        const content = await this.#selectRows(); 
        const objs = content.map(element => element);
        return objs
    }

    async deleteById(id){
        // Delete element with given id;
        this.#deleteRow({id: id})
    }

    async deleteAll(){
        // Delete all elements from a table
        await this.#deleteRow(true);
    }
}

// export default Container;
export default Container;
