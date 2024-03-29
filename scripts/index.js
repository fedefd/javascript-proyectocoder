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
  const ocultarFormularioDeRegistro = document.getElementById('fondo-borroso');
  const ocultarCatalogo = document.getElementById('ocultar-resultados');
  const selectGenero = document.getElementById('genre');
  const buscarTitulo = document.getElementById('title');
  const elementosLiHeaderLower = document.querySelectorAll('.header-lower ul li');
  const elementosAHeaderLower = document.querySelectorAll('.header-lower ul li a');
  const liocultarTitulos = document.getElementById('liOcultarTitulos');

  function handleClick(event) {
    elementosLiHeaderLower.forEach(li => {
      li.classList.remove('header-lower-active');
    });
    event.currentTarget.parentNode.classList.add('header-lower-active');
  }
  elementosAHeaderLower.forEach(a => {
    a.addEventListener('click', handleClick);
  });


  buscarTitulo.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      tituloButton.click(); // para pulsar enter en la search bar del lower header
    }
  })

  selectGenero.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      generoButton.click();  // para pulsar enter en filtrar por genero
    }
  });
  selectGenero.addEventListener('blur', function () {
    selectGenero.classList.remove('select-active');
  });

  selectGenero.addEventListener('focus', function () {
    selectGenero.classList.add('select-active');
  });

  document.addEventListener('click', function (event) {
    const liocultarTitulos = document.getElementById('liOcultarTitulos');
    const targetElement = event.target;
    if (targetElement !== liocultarTitulos && !liocultarTitulos.contains(targetElement)) {
      liocultarTitulos.classList.remove('header-lower-active');
    }
  });



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

  ocultarFormularioDeRegistro.addEventListener('click', ocultarFormulario);

  ocultarCatalogo.addEventListener('click', ocultarResultados);
});

function quitarTildes(cadena) {
  const tildes = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' };
  return cadena.replace(/[áéíóú]/g, letra => tildes[letra] || letra);
}


function filtrarPorGenero() {
  const elementosLiHeaderLower = document.querySelectorAll('.header-lower ul li');
  const generosSeleccionados = document.getElementById('genre').value.split(',').map(genero => genero.trim().toLowerCase());

  const resultado = catalogo.filter(pelis => {
    const generoPelicula = quitarTildes(pelis.genero.trim().toLowerCase());
    return generosSeleccionados.some(genero => generoPelicula.includes(genero));
  });

  mostrarResultado(resultado);
  elementosLiHeaderLower.forEach(li => {
    li.classList.remove('header-lower-active');
  });
}


function ordenarPorAño() {
  const resultado = catalogo.sort((a, b) => a.año - b.año);
  mostrarResultadoConAño(resultado);
}

export function mostrarResultado(resultado) {
  const resultContainer = document.getElementById('result-container');
  const resultAutoComplete = document.getElementById('autocomplete-results');
  const resultSearch = document.getElementById('searchResults');
  resultSearch.innerHTML = '';
  resultAutoComplete.innerHTML = '';
  resultContainer.innerHTML = '';
  document.getElementById('searchResults').classList.remove('search-results-active');

  if (resultado.length === 0) {
    resultContainer.innerText = "No se encontraron resultados.";
  } else {
    resultado.forEach(pelicula => {
      const div = document.createElement('div');
      div.classList.add('catalogo-item');

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
  setTimeout(ajustarTamañoLetra, 0);
}

function ocultarResultados() {
  const resultContainer = document.getElementById('result-container');
  const resultAutoComplete = document.getElementById('autocomplete-results');
  const resultSearch = document.getElementById('searchResults');
  resultContainer.innerHTML = '';
  resultAutoComplete.innerHTML = '';
  resultSearch.innerHTML = '';
  document.getElementById('searchResults').classList.remove('search-results-active');
}

function mostrarResultadoConAño(resultado) {
  const elementosLiHeaderLower = document.querySelectorAll('.header-lower ul li');
  const resultContainer = document.getElementById('result-container');
  const resultAutoComplete = document.getElementById('autocomplete-results');
  const resultSearch = document.getElementById('searchResults');
  resultSearch.innerHTML = '';
  resultAutoComplete.innerHTML = '';
  resultContainer.innerHTML = '';
  document.getElementById('searchResults').classList.remove('search-results-active');

  if (resultado.length === 0) {
    resultContainer.innerText = "No se encontraron resultados.";
  } else {
    resultado.forEach(pelicula => {

      const div = document.createElement('div');
      div.classList.add('catalogo-item');

      const imagen = document.createElement('img');
      imagen.src = pelicula.imagen;
      imagen.alt = pelicula.titulo;


      const p = document.createElement('p');
      p.textContent = `${pelicula.titulo}`;
      p.classList.add('centrado');

      const span = document.createElement('span');
      span.textContent = `(${pelicula.año})`;
      span.classList.add('centrado');


      div.appendChild(p);
      div.appendChild(span);
      div.appendChild(imagen);

      resultContainer.appendChild(div);
    });
  }
  setTimeout(ajustarTamañoLetra, 0);
  elementosLiHeaderLower.forEach(li => {
    li.classList.remove('header-lower-active');
  });
}

function ajustarTamañoLetra() {
  const elementos = document.querySelectorAll('.catalogo-item');

  elementos.forEach(elemento => {
    const contenedorAncho = elemento.offsetWidth;
    const parrafo = elemento.querySelector('p');

    const spanMedicion = document.createElement('span');
    spanMedicion.style.visibility = 'hidden';
    spanMedicion.style.whiteSpace = 'nowrap';
    spanMedicion.style.fontSize = window.getComputedStyle(parrafo).fontSize;
    spanMedicion.textContent = parrafo.textContent;

    parrafo.appendChild(spanMedicion);
    const anchoTexto = spanMedicion.offsetWidth;
    parrafo.removeChild(spanMedicion);

    if (anchoTexto >= contenedorAncho) {

      const fontSizeActual = parseFloat(window.getComputedStyle(parrafo).fontSize);
      const proporcion = contenedorAncho / anchoTexto;


      const nuevoTamaño = Math.floor(fontSizeActual * proporcion * 0.96);

      parrafo.style.fontSize = nuevoTamaño + 'px';
      console.log(nuevoTamaño)
    } else {
      parrafo.style.fontSize = '';

    }
  });
}
