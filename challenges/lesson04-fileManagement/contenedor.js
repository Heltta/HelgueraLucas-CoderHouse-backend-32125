import * as fs from 'node:fs';

class Contenedor {
    constructor(filePath){
        this.filePath=filePath;
    }

    async #getParsedFile(){
        //Lee el archivo y lo devuelve parseado
        try {
            const content = await fs.promises.readFile(
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

    async save(data){
        //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        const content = await this.#getParsedFile(); 
        const objId = content.length+1;
        //const objParseado = JSON.stringify({...data, id:objId });
        content.push({...data, id:objId });
        const stringContent = JSON.stringify(content);
        try{
            await fs.promises.writeFile(
                this.filePath,
                stringContent,
            )
            console.log('Obj agregado');
            return objId
        }
        catch(error) {
            console.log(error);
        }
        
        
    }
    
    async getById(id){
        //Recibe un id y devuelve el objeto con ese id, o null si no está.
        const content = await this.#getParsedFile(); 
        const obj = content.filter(element => element.id === id);
        console.log('Objeto encontrado');
        console.log(obj);
        return obj
    }

    async getAll(){
        //Devuelve un array con los objetos presentes en el archivo.
        const content = await this.#getParsedFile(); 
        const objs = content.map(element => element);
        return objs
    }

    deleteById(id){
        //Elimina del archivo el objeto con el id buscado
    }

    async deleteAll(){
        //Elimina todos los objetos presentes en el archivo.
        try{
            await fs.promises.writeFile(
                this.filePath,
                '[]',
            )
            console.log('Objs eliminados');
        }
        catch(error) {
            console.log(error);
        }
    }
}

export default Contenedor;
