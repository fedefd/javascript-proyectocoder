let catalogo = [
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

document.addEventListener('DOMContentLoaded', function () {
  const signupButton = document.getElementById('signupButton');
  const loginButton = document.getElementById('loginButton');
  const borrarLocalStorageButton = document.getElementById('borrarLocalStorageButton');
  const submitButton = document.getElementById('submitButton');
  const generoButton = document.getElementById('generoButton');
  const tituloButton = document.getElementById('tituloButton');
  const yearButton = document.getElementById('yearButton');
  const todosLosTitulosButton = document.getElementById('todosLosTitulosButton');
  const ocultarFormularioDeRegistro = document.getElementById('fondo-borroso');

  signupButton.addEventListener('click', function () {
    mostrarFormulario('signup');
  });

  loginButton.addEventListener('click', function () {
    mostrarFormulario('login');
  });

  borrarLocalStorageButton.addEventListener('click', borrarLocalStorage);

  submitButton.addEventListener('click', registroSubmit);

  generoButton.addEventListener('click', filtrarPorGenero);

  tituloButton.addEventListener('click', buscarPorTitulo);

  yearButton.addEventListener('click', ordenarPorAño);

  todosLosTitulosButton.addEventListener('click', mostrarTodosLosTitulos);

  ocultarFormularioDeRegistro.addEventListener('click', ocultarFormulario);
});

function filtrarPorGenero() {
  const genero = document.getElementById('genre').value;
  const resultado = catalogo.filter(pelis => pelis.genero.toLowerCase() === genero.toLowerCase());
  mostrarResultado(resultado);
}

function buscarPorTitulo() {
  const titulo = document.getElementById('title').value.toLowerCase();
  const resultado = catalogo.filter(pelis => pelis.titulo.toLowerCase().includes(titulo));
  mostrarResultado(resultado);
}

function ordenarPorAño() {
  const resultado = catalogo.sort((a, b) => a.año - b.año);
  mostrarResultadoConAño(resultado);
}

function mostrarTodosLosTitulos() {
  const resultado = catalogo.map(item => (item.titulo ? { titulo: item.titulo } : { titulo: "Título no disponible" }));
  mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = '';

  if (resultado.length === 0) {
    resultContainer.innerText = "No se encontraron resultados.";
  } else {
    resultado.forEach(pelicula => {
      const p = document.createElement('p');
      p.textContent = `${pelicula.titulo} `;
      resultContainer.appendChild(p);
    });
  }
}

function mostrarResultadoConAño(resultado) {
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = '';

  if (resultado.length === 0) {
    resultContainer.innerText = "No se encontraron resultados.";
  } else {
    resultado.forEach(pelicula => {
      const p = document.createElement('p');
      p.textContent = `Título: ${pelicula.titulo} (${pelicula.año})`;
      resultContainer.appendChild(p);
    });
  }
}



