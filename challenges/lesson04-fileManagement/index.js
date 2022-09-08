import Contenedor from "./contenedor.js";

const contenedor = new Contenedor('challenges/lesson04-fileManagement/test/content.json');

contenedor.save(
    {
        title: 'Champion',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    }
);

console.log('fin programa');
