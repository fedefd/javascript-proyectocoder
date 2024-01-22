/*
let numeroWhile = 0;
let si = true;
const nombre = prompt("Ingrese nombre");


// if //
function ifsi() {

  if (si === true) {
    console.log("if -> ", "si")
    si = false;
  }

  else if (si === false) {
    console.log("if -> ", "no")
    si = true;
  }

  else return;
}
ifsi();
ifsi();

// for //
function bucle() {
  let i = 0;
  for (i = 0; i <= 10; i++) {
    numero = i
    console.log("for -> ", numero);
  }
}
bucle();

// while //
while (numeroWhile < 5) {
  numeroWhile++;
}
console.log("while -> ", numeroWhile)

// prompt //
function saludar(nombre) {
  console.log("Buenos dias " + nombre + "!");
}
saludar(nombre)

*/

// buscador y proximamente rankeador de peliculas / series 

let showsYPeliculas = [
  {
    titulo: "El Padrino",
    director: "Francis Ford Coppola",
    año: 1972,
    genero: "Drama"
  },
  {
    titulo: "Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    año: 1999,
    genero: "Ciencia ficcion"
  },
  {
    titulo: "Titanic",
    director: "James Cameron",
    año: 1997,
    genero: "Romance"
  },
  {
    titulo: "The Office",
    creador: "Greg Daniels",
    año: 2005,
    genero: "Comedia"
  },
  {
    titulo: "Parks and Recreation",
    creador: "Greg Daniels, Michael Schur",
    año: 2009,
    genero: "Comedia"
  },
  {
    titulo: "Breaking Bad",
    creador: "Vince Gilligan",
    año: 2008,
    genero: "Drama"
  },
  {
    titulo: "Game of Thrones",
    creador: "David Benioff, D. B. Weiss",
    año: 2011,
    genero: "Fantasia"
  },
  {
    titulo: "The Witcher",
    creador: "Lauren Schmidt Hissrich",
    año: 2019,
    genero: "Fantasia"
  },
  {
    titulo: "Pokemon",
    creador: "Takeshi Shudo (1997–2002), Junki Takegami (2002–2006), Atsuhiro Tomioka (2006–2016), Aya Matsui (2016–2019), Shōji Yonemura (2019–2023), Dai Satō (2023–present)",
    año: 1997,
    genero: "Aventura"
  },
  {
    titulo: "Doona",
    creador: "Song Kyung-hwa",
    año: 2023,
    genero: "Romance"
  },
  {
    titulo: "Peaky Blinders",
    creador: "Steven Knight",
    año: 2013,
    genero: "Drama"
  }
];


function filtrarPorGenero(genero) {
  const resultado = showsYPeliculas.filter(pelis => pelis.genero.toLowerCase() === genero.toLowerCase());
  return resultado ? resultado : "no se encontro ese genero";
}


function buscarPorTitulo(title) {
  // return showsYPeliculas.find(pelis => pelis.titulo.toLowerCase() === title.toLowerCase());
  const resultado = showsYPeliculas.find(pelis => pelis.titulo.toLowerCase() === title.toLowerCase());
  return resultado ? resultado : "no se encontro ese título en el catalogo";
}


function ordenarPorAño() {
  return showsYPeliculas.sort((a, b) => a.año - b.año);
}


// console.log("Peliculas/series de Drama ->", filtrarPorGenero("drama"));
// console.log("Pelicula/serie por titulo ->", buscarPorTitulo("game of thrones"));
// console.log("Peliculas/series ordenadas por año de lanzamiento ->", ordenarPorAño());

function menuPrincipal() {
  const elegir = prompt("Elige una opción: \n 1. Filtrar por género \n 2. Buscar por título \n 3. Mostrar series y películas por año de lanzamiento \n 4. Mostrar todos los títulos y volver a elegir \n 5. Salir");

  switch (elegir) {
    case "1":
      const genero = prompt("Ingresa el género a filtrar: \n Drama \n Romance \n Aventura \n Fantasia \n Comedia \n Ciencia ficcion");
      console.log(filtrarPorGenero(genero));
      break;
    case "2":
      const titulo = prompt("Ingresa el titulo de la pelicula o serie");
      console.log(buscarPorTitulo(titulo));
      break;
    case "3":
      console.log(ordenarPorAño());
      break;
    case "4":
      mostrarTodosLosTitulos();
      break;
    case "5":
      console.log("hasta luego!");
      return;
    default:
      console.log("Opción no válida.");
      break;
  }
}

function mostrarTodosLosTitulos() {
  showsYPeliculas.forEach(title => {
    console.log(title.titulo);
  });
  menuPrincipal();
}

//menuPrincipal();




