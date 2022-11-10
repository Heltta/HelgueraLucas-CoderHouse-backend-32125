import mongoose from "mongoose";


class Container {
    constructor(collectionName, modelClass){
        // Precondition: modelClass has as method for creating a schema 
        // in MongoDB

        this.coll =  collectionName;
        this.#connectDB();
        this.model = mongoose.model(collectionName, modelClass.mongoSchema());

    }

    #connectDB(){
        const URL = 'mongodb://localhost:27017';
        mongoose.connect(URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        console.log(`Conection with MongoDB starter for ${this.coll} collection `);
    }

    async #selectRows(objCondition = {}){
        // Select all rows from table stored at DB that pass a condition.
        // If not condition is passed, then return all table's rows.
        try{
            const rows = await 
                this.model.find(objCondition);
            return rows
        }
        catch(error) {
            console.log(error); throw error;
        };
    }

    async #inserDocument(obj){
        // Insert object as a row into table
        const { id, ...objData } = obj;
        try{
            const newModel = new this.model(objData)
            let objSave = await newModel.save();
            return objSave._id;
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
                this.model

            return rows;
        }
        catch(error) {
            console.log(error); throw error;
        };
    }

    async #deleteDocument(objCondition){
        // Delete a row from table using object syntax
        try{
            const request = await this.model.deleteOne(objCondition);
            return request.deletedCount;
        }
        catch(error) {
            console.log(error); throw error;
        };
    }

    async save(data){
        // Store object data as a row into table
        try{
            return await this.#inserDocument(data)
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
        const content = await this.#selectRows({_id: id}); 
        return content
    }

    async getAll(){
        //Devuelve un array con los objetos presentes en el archivo.
        return await this.#selectRows();
    }

    async deleteById(id){
        // Delete element with given id;
        return await this.#deleteDocument({_id: id})
    }
}

// export default Container;
export default Container;
