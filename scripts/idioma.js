import * as index from './index.js';
import * as api from './api.js';
const changeLanguageButton = document.getElementById('languageButton');


function changeLanguage(language) {
  const options = document.querySelectorAll('#genre option');
  const filtrarPorGenero = document.getElementById('filtrarPorGenero');
  const ocultarTitulos = document.getElementById('ocultar-resultados');
  const headerLowerLoNuevo = document.getElementById('header-lower-lo-nuevo');
  const headerLowerPeliculas = document.getElementById('header-lower-peliculas');
  const inputs = document.querySelectorAll('input[data-placeholder-en], input[data-placeholder-es]');
  inputs.forEach(input => {
    if (language === 'en') {
      input.placeholder = input.getAttribute('data-placeholder-en');
    } else if (language === 'es') {
      input.placeholder = input.getAttribute('data-placeholder-es');
    }
  });
  options.forEach(option => {
    const text = language === 'en' ? option.getAttribute('data-en') : option.getAttribute('data-es');
    option.textContent = text;
  });


  if (language === 'es') {
    changeLanguageButton.textContent = changeLanguageButton.getAttribute('data-es');
    languageButton.textContent = languageButton.getAttribute('data-es');
    signupButton.textContent = signupButton.getAttribute('data-es');
    loginButton.textContent = loginButton.getAttribute('data-es');
    desconexionButton.textContent = desconexionButton.getAttribute('data-es');
    borrarLocalStorageButton.textContent = borrarLocalStorageButton.getAttribute('data-es');
    mensajeRegistroLogin.textContent = mensajeRegistroLogin.getAttribute('data-es');
    submitButton.textContent = submitButton.getAttribute('data-es');
    headerLowerPeliculas.textContent = headerLowerPeliculas.getAttribute('data-es');
    headerLowerLoNuevo.textContent = headerLowerLoNuevo.getAttribute('data-es');
    ocultarTitulos.textContent = ocultarTitulos.getAttribute('data-es');

    filtrarPorGenero.textContent = filtrarPorGenero.getAttribute('data-es');
    tituloButton.textContent = tituloButton.getAttribute('data-es');
    generoButton.textContent = generoButton.getAttribute('data-es');
    yearButton.textContent = yearButton.getAttribute('data-es');
    ocultarTitulos.textContent = ocultarTitulos.getAttribute('data-es');
    addXSpan()
  } else if (language === 'en') {
    changeLanguageButton.textContent = changeLanguageButton.getAttribute('data-en');
    languageButton.textContent = languageButton.getAttribute('data-en');
    signupButton.textContent = signupButton.getAttribute('data-en');
    loginButton.textContent = loginButton.getAttribute('data-en');
    desconexionButton.textContent = desconexionButton.getAttribute('data-en');
    borrarLocalStorageButton.textContent = borrarLocalStorageButton.getAttribute('data-en');
    mensajeRegistroLogin.textContent = mensajeRegistroLogin.getAttribute('data-en');
    submitButton.textContent = submitButton.getAttribute('data-en');
    headerLowerPeliculas.textContent = headerLowerPeliculas.getAttribute('data-en');
    headerLowerLoNuevo.textContent = headerLowerLoNuevo.getAttribute('data-en');
    ocultarTitulos.textContent = ocultarTitulos.getAttribute('data-en');

    filtrarPorGenero.textContent = filtrarPorGenero.getAttribute('data-en');
    tituloButton.textContent = tituloButton.getAttribute('data-en');
    generoButton.textContent = generoButton.getAttribute('data-en');
    yearButton.textContent = yearButton.getAttribute('data-en');
    ocultarTitulos.textContent = ocultarTitulos.getAttribute('data-en');
    addXSpan()
  }
}

changeLanguageButton.addEventListener('click', () => {
  const currentLanguage = document.documentElement.lang;

  if (currentLanguage === 'es') {
    document.documentElement.lang = 'en';
  } else {
    document.documentElement.lang = 'es';
  }

  changeLanguage(document.documentElement.lang);
});

function addXSpan() {
  const span = document.createElement('span');
  span.textContent = 'x ';
  desconexionButton.prepend(span);
}