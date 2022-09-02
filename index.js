//Entrega de clase 2: Clases

// 1) Declarar una clase Usuario
// 2) Hacer que Usuario cuente con los siguientes atributos:
//     ● nombre: String
//     ● apellido: String
//     ● libros: Object[]
//     ● mascotas: String[]

// Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

// 3) Hacer que Usuario cuente con los siguientes métodos:
// ● getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
// ● addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
// ● countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
// ● addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
// ● getBookNames(): String[]. Retorna un array con sólo los nombres del array de
// libros del usuario.

// 4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.

// > Ejemplos:
// ● countMascotas: Suponiendo que el usuario tiene estas mascotas: ['perro', 'gato']
// usuario.countMascotas() debería devolver 2.
// ● getBooks: Suponiendo que el usuario tiene estos libros: [{nombre: 'El señor de las
// moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}]
// usuario.getBooks() debería devolver ['El señor de las moscas', 'Fundacion'].
// ● getFullName: Suponiendo que el usuario tiene: nombre: 'Elon' y apellido: 'Musk'
// usuario.getFullName() deberia devolver 'Elon Musk'

class Usuario{
    constructor(name, surname , books =[], pets = []){
        this.nombre = String(name)
        this.apellido= String(surname)
        this.libros= Array(...books)
        this.mascotas= Array(...pets)
    };

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    };

    addMascota(petName){
        this.mascotas.push(petName);
    };

    countMascotas(){
        return this.mascotas.length;
    };

    addBook(title, author){
        this.libros.push({
            nombre: String(title),
            autor: String(author)
        })
        return;
    }

    getBookNames(){
        const names= []
        this.libros.forEach(book => names.push( book.nombre ));
        return names
    }
}

//Test00
{
    console.log(`\n\nTest 00`);

    const usuario = new Usuario(
        'Pepe',
        'Botella',
        [{nombre:'La hora del chocolate', autor:'Magdalena Helguera'}],
        ['Firo']);

    //Name
    usuario.getFullName();

    //Pets
    console.log(`-Pets`);
    console.log(usuario.countMascotas());
    usuario.addMascota('Shiro');
    console.log(usuario.countMascotas());

    //Books
    console.log(`-Books`);
    console.log(usuario.getBookNames());
    usuario.addBook(
        'Games of Thrones',
        'George R. R. Martín');
    console.log(usuario.getBookNames());
}

//Test01
{
    console.log(`\n\nTest 01`);

    const usuario = new Usuario (
        'Isidoro',
        'Cañones',
    );

    //Name
    usuario.getFullName();

    //Pets
    console.log(`-Pets`);
    console.log(usuario.countMascotas());
    usuario.addMascota('Bugs Bunny');
    usuario.addMascota('Tas');
    usuario.addMascota('Piolin');
    usuario.addMascota('Silvestre');
    console.log(usuario.countMascotas());
    
    //Books
    console.log(`-Books`);
    console.log(usuario.getBookNames());
    usuario.addBook(
        'Harry Potter and the Philosopher\'s Stone',
        'J. K. Rowling');
    usuario.addBook(
        'Le Petit Prince',
        'Antoine de Saint-Exupéry');
    console.log(usuario.getBookNames());
}