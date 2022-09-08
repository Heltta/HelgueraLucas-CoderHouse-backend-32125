const fs = require('fs');

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

    save(data){
        //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        let id;
        return id
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