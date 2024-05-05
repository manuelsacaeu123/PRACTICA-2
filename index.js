const express = require('express');
const app = express();
const PORT = 3000; //Como se indico en clase es el puerto donde se puede acceder a la aplicacion y puede ser variante

//array DE libros
let librosBiblicos = [
    { id: 1, nombre: 'Genesis', autor: 'Moises' },
    { id: 2, nombre: 'Exodo', autor: 'Moises' },
    { id: 3, nombre: 'Levitico', autor: 'Moises' },
    { id: 4, nombre: 'Deuteronomio', autor: 'Moises' },
    { id: 5, nombre: 'Numeros', autor: 'Moises' },
    { id: 6, nombre: 'Juan', autor: 'Juan' },
    { id: 7, nombre: 'Juan 2', autor: 'Juan' },
    { id: 8, nombre: 'Juan 3', autor: 'Juan' },
    { id: 9, nombre: 'Judas', autor: 'Judas' },
    { id: 10, nombre: 'Apocalipsis', autor: 'Juan' }
];
//manejo de json
app.use(express.json());


// ENDPOINT 1 - de bienvenida
app.get('/bienvenida', (req, res) => {
    res.send('Hola Soy Manuel Saca Eulate y actualmente soy Técnico en Telecomunicaciones \nHola Soy Marco Antonio Villca Quispe y actualmente soy Técnico en Informática y computacion');
});


//endpoint para obtener todos los libros - para practicar
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});


// ENPOINT 2 - Obtener libros por autor
app.get('/libros/autor/:autor', (req, res) => {
    const autorCapturado = req.params.autor;
    console.log(autorCapturado);
    const librosPorAutor = librosBiblicos.filter(libro => libro.autor === autorCapturado);
    if (librosPorAutor.length > 0) {
        res.json(librosPorAutor);
    } else {
        res.status(404).json({ mensaje: 'El Autor no se encuentra' });
    }
});


// ENDPOINT 3 - Obtener la cantidad total de libros
app.get('/libros/cantidad', (req, res) => {
    const cantidadTotal = librosBiblicos.length;

    if (cantidadTotal === 0) {
        res.status(404).json({ mensaje: 'No hay libros disponibles' });
        return;
    }

    res.json({ cantidadTotal });
});



// ENDPOINT 4 - Obtener libros por nombre que contenga el texto "Juan"
app.get('/libros/nombre/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ mensaje: 'Debe especificar un nombre válido' });
    }
    // ponemos en minusculas
    const librosBuscado = librosBiblicos.filter(libro =>
        libro.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    // Verificar si se encontraron libros 
    if (librosBuscado.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron libros que coincidan con el nombre proporcionado' });
    }
    // Devolver los libros encontrados
    res.json(librosBuscado);
});



// Ordenar libros por nombre
app.get('/libros/ordenar-por-nombre', (req, res) => {
    // Ordenar los libros alfabéticamente
    const librosOrdenados = librosBiblicos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    
    res.json(librosOrdenados);
});


app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});