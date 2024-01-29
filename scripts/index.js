import { catalogo } from "./catalogo.js";

document.addEventListener('DOMContentLoaded', function () {
  const signupButton = document.getElementById('signupButton');
  const loginButton = document.getElementById('loginButton');
  const desconexionButton = document.getElementById('desconexionButton');
  const borrarLocalStorageButton = document.getElementById('borrarLocalStorageButton');
  const submitButton = document.getElementById('submitButton');
  const generoButton = document.getElementById('generoButton');
  const tituloButton = document.getElementById('tituloButton');
  const yearButton = document.getElementById('yearButton');
  const todosLosTitulosButton = document.getElementById('todosLosTitulosButton');
  const ocultarFormularioDeRegistro = document.getElementById('fondo-borroso');
  const headerLowerPeliculas = document.getElementById('header-lower-peliculas');
  const headerLowerSeries = document.getElementById('header-lower-serie');
  const headerLowerAnimes = document.getElementById('header-lower-anime');
  const headerLowerKdramas = document.getElementById('header-lower-kdrama');


  signupButton.addEventListener('click', function () {
    mostrarFormulario('signup');
  });

  loginButton.addEventListener('click', function () {
    mostrarFormulario('login');
  });

  desconexionButton.addEventListener('click', salirDeLaSesion);

  borrarLocalStorageButton.addEventListener('click', borrarLocalStorage);

  submitButton.addEventListener('click', registroSubmit);

  generoButton.addEventListener('click', filtrarPorGenero);

  tituloButton.addEventListener('click', buscarPorTitulo);

  yearButton.addEventListener('click', ordenarPorAño);

  todosLosTitulosButton.addEventListener('click', mostrarTodosLosTitulos);

  ocultarFormularioDeRegistro.addEventListener('click', ocultarFormulario);

  headerLowerPeliculas.addEventListener('click', mostrarPeliculas)

  headerLowerSeries.addEventListener('click', mostrarSeries)

  headerLowerAnimes.addEventListener('click', mostrarAnimes)

  headerLowerKdramas.addEventListener('click', mostrarKdramas)
});

function quitarTildes(cadena) {
  const tildes = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
  return cadena.replace(/[áéíóú]/g, letra => tildes[letra] || letra);
}


function filtrarPorGenero() {
  const generosSeleccionados = document.getElementById('genre').value.split(',').map(genero => genero.trim().toLowerCase());

  const resultado = catalogo.filter(pelis => {
    const generoPelicula = quitarTildes(pelis.genero.trim().toLowerCase());
    return generosSeleccionados.some(genero => generoPelicula.includes(genero));
  });

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



