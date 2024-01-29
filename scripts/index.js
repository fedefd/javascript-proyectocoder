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



