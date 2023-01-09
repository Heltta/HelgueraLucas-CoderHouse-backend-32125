import mongoose, { connect } from "mongoose";
import { MONGO_URL } from "../config/dotEnVar.js";


class Container {
    constructor(collectionName, modelClass){
        // Precondition: modelClass has as method for creating a schema 
        // in MongoDB

        this.coll =  collectionName;
        this.#connectDB();
        this.model = mongoose.model(collectionName, modelClass.mongoSchema());

    }

    #connectDB(){
        const URL = MONGO_URL;
        mongoose.connect(URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        console.log(`Conection with MongoDB started for ${this.coll} collection `);
    }

    async #findDocuments(objCondition = {}){
        // Seach all docs from container collection stored at DB that pass a condition.
        // If not condition is passed, then return all docs inside the collection.
        try{
            const modelList = await 
                this.model.find(objCondition);
            if(modelList.length === 0) return null
            else return modelList.map( model => model._doc );
        }
        catch(error) {
            console.log(error); throw error;
        };
    }

    async #insertDocument(obj){
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

    async #updateDocuments(objCondition,obj){
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
                this.model.updateOne(objCondition,obj)

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
            return await this.#insertDocument(data)
        }
        catch(error) {
            console.log(error);
        }
    }

    async overwriteById(id, objData){
        // Update fields inside row with given id.
        // objData parameter contains the keys of the fields
        // and the new content of those.
        return await this.#updateDocuments({_id:id}, objData);
    }
    
    async getById(id){
        //Recibe un id y devuelve el objeto con ese id, o [] si no está.
        const content = await this.#findDocuments({_id: id}); 
        return content
    }
    
    async findOne(condition){
        //Recibe un id y devuelve el objeto con ese id, o null si no está.
        try{
            const content = (await this.#findDocuments(condition))[0];
            if(content) return content;
            else return null;
        }
        catch(err) {
            console.log(err);
        }
    }

    async getAll(){
        //Devuelve un array con los objetos presentes en el archivo.
        return await this.#findDocuments();
    }

    async deleteById(id){
        // Delete element with given id;
        return await this.#deleteDocument({_id: id})
    }
}

// export default Container;
export default Container;
