
const template = Handlebars.compile(`
    <h1>{{titulo}}</h1>
    <h2>Datos Personales del usuario</h2>
    <ul>
        <li>{{nombre}}</li>
        <li>{{apellido}} </li>
        <li>{{edad}}</li>
        <li>{{email}}</li>
        <li>{{teléfono}} </li>
    </ul>
    <p> Traductor de Google, esto está en está en español<p>`
); // compila la plantilla
const html = template({ 
        titulo: 'CoderHouse',
        nombre: 'Pepe',
        apellido: 'Botella',
        edad: '40',
        email: 'pepito_botellon@hotmail.com',
        telefono: '+599 91 123 123'

}); // genera el html
document.querySelector('span').innerHTML = html; // inyecta el resultado en la vista