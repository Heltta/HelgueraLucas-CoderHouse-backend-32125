//////////// Express import /////////////
import express, {
    json,
    urlencoded,
} from "express";

//////////// Static config libraries //
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/////////// Server config /////////////
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();


//////////// Middleware ///////////////

//-- Express middleware ---------//
app.use(json());
app.use(urlencoded({ extended:true }));

/////////// Turn on server ///////////
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on('error', error => console.log(`Error en servidor ${error}`));
