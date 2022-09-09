import Contenedor from "./contenedor.js";

const contenedor = new Contenedor('challenges/lesson04-fileManagement/test/content.json');

const testingObj = {
    title: 'Champion',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
}


//Test save
try{
    console.log('Test save');
    await contenedor.save(testingObj);
    await contenedor.save(testingObj);
    console.log('Objects added');
}
catch(error){
    console.log(error)
}

//Test getById
try{
    console.log('Test getById');
    const objFound = await contenedor.getById(2);
    console.log(objFound);
}
catch(error){
    console.log(error)
}

//Test getAll
try{
    console.log('Test getAll');
    const allObjs = await contenedor.getAll()
    console.log( allObjs );
}
catch(error){
    console.log(error)
}

//Test deleteById
try{
    //Test deleteById when id doesn't exist
    console.log('Test deleteById when id doesn\'t exist (id = 798764)');
    await contenedor.deleteById(798764);
    const allObjs = await contenedor.getAll()
    console.log( allObjs );
}
catch(error){
    console.log(error)
}

try{
    //Test deleteById when id exists
    console.log('Test deleteById when id exists (id = 2)');
    await contenedor.deleteById(2);
    const allObjs = await contenedor.getAll()
    console.log( allObjs );
}
catch(error){
    console.log(error)
}

//Test deleteAll
try{
    console.log('Test deleteAll');
    await contenedor.deleteAll()
    const allObjs = await contenedor.getAll()
    console.log( allObjs );
}
catch(error){
    console.log(error)
}

console.log('fin programa');
