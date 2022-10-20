// import * as fs from 'node:fs';
import { promises } from 'fs';

class Container {
    constructor(filePath){
        this.filePath=filePath;
    }

    async #getParsedFile(){
        //Lee el archivo y lo devuelve parseado
        try {
            const content = await promises.readFile(
                this.filePath,
                'utf-8'
            );
            const parsedContent = JSON.parse(content);
            return parsedContent;
        }
        catch(error) {
            console.log(error);
        }
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

    async save(data){
        //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        const content = await this.#getParsedFile(); 

        const objId = (content.length === 0)?
            1
            :
            content[content.length-1].id+1;
        
        content.push({...data, id:objId });

        try{
            await this.#writeObj(content)
            return objId
        }
        catch(error) {
            console.log(error);
        }
    }

    async overwriteById(id, data){
        //Recibe un objeto con id existente y sobreescribe al objeto de dicha id
        const content = await this.#getParsedFile();
        if (content.some( (element) => element.id === id )) {
            //Solo filtro los objetos si es que existe un objeto con al id ingresada
            const mapedContent = content.map( (element) => (element.id !== id)? element : {...data, id:id });
            await this.#writeObj(mapedContent);
        }
    }
    
    async getById(id){
        //Recibe un id y devuelve el objeto con ese id, o [] si no está.
        const content = await this.#getParsedFile(); 
        const obj = content.filter(element => element.id === id);
        return obj
    }

    async getAll(){
        //Devuelve un array con los objetos presentes en el archivo.
        const content = await this.#getParsedFile(); 
        const objs = content.map(element => element);
        return objs
    }

    async deleteById(id){
        //Elimina del archivo el objeto con el id buscado
        const content = await this.#getParsedFile();
        if (content.some( (element) => element.id === id )) {
            //Solo filtro los objetos si es que existe un objeto con al id ingresada
            const filteredContent = content.filter( (element) => element.id !== id );
            await this.#writeObj(filteredContent);
        }
    }

    async deleteAll(){
        //Elimina todos los objetos presentes en el archivo.
        await this.#writeObj([]);
    }
}

// export default Container;
export default Container;
