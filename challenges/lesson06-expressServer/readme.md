# MANEJO DE ARCHIVOS

**Formato**: link a un repositorio en Github y url de proyecto subido a glitch.  
**Observación:**: no incluir la carpeta node_modules

## Consigna:
Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

1. Realizar un proyecto de servidor basado en node.js que utilice el módulo express e
implemente los siguientes endpoints en el puerto 8080:
    * Ruta get '/productos' que devuelva un array con todos los productos disponibles
en el servidor
    * Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos
los productos disponibles
2. Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío
anterior para acceder a los datos persistidos del servidor.

Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el
ejemplo del desafío anterior.

## Ejemplo

Contenido de "productos.txt" con 3 productos almacenados

```
[
    {
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
        id: 1
    },
    {
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
        id: 2
    },
    {
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
        id: 3
    }
]
```
