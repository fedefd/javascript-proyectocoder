import { catalogo } from "./catalogo.js";

document.addEventListener('DOMContentLoaded', function () {
  const signupButton = document.getElementById('signupButton');
  const loginButton = document.getElementById('loginButton');
  const desconexionButton = document.getElementById('desconexionButton');
  const borrarLocalStorageButton = document.getElementById('borrarLocalStorageButton');
  const submitButton = document.getElementById('submitButton');
  const generoButton = document.getElementById('generoButton');
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

  yearButton.addEventListener('click', ordenarPorAño);

  todosLosTitulosButton.addEventListener('click', mostrarTodosLosTitulos);

  ocultarFormularioDeRegistro.addEventListener('click', ocultarFormulario);
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


function ordenarPorAño() {
  const resultado = catalogo.sort((a, b) => a.año - b.año);
  mostrarResultadoConAño(resultado);
}

function mostrarTodosLosTitulos() {
  const resultado = catalogo.map(item => ({
    titulo: item.titulo ? item.titulo : "Título no disponible",
    imagen: item.imagen ? item.imagen : "Imagen no disponible"
  }));
  mostrarResultado(resultado);
}

export function mostrarResultado(resultado) {
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = '';

  if (resultado.length === 0) {
    resultContainer.innerText = "No se encontraron resultados.";
  } else {
    resultado.forEach(pelicula => {
      const div = document.createElement('div');


      const imagen = document.createElement('img');
      imagen.src = pelicula.imagen;
      imagen.alt = pelicula.titulo;


      const p = document.createElement('p');
      p.textContent = pelicula.titulo;


      div.appendChild(p);
      div.appendChild(imagen);
      resultContainer.appendChild(div);
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

      const div = document.createElement('div');


      const imagen = document.createElement('img');
      imagen.src = pelicula.imagen;
      imagen.alt = pelicula.titulo;


      const p = document.createElement('p');
      p.textContent = `${pelicula.titulo} (${pelicula.año})`;


      div.appendChild(p);
      div.appendChild(imagen);
      resultContainer.appendChild(div);
    });
  }
}



