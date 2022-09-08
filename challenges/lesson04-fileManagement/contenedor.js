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

    getById(id){
        //Recibe un id y devuelve el objeto con ese id, o null si no está.
        let obj = null;
        return obj
    }

    getAll(){
        //Devuelve un array con los objetos presentes en el archivo.
        let objs = [];
        return objs
    }

    deleteById(id){
        //Elimina del archivo el objeto con el id buscado
    }

    deleteAll(){
        //Elimina todos los objetos presentes en el archivo.
    }
}

export default Contenedor;
