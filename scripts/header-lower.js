import { catalogo } from "./catalogo.js";
import { mostrarResultado } from "./index.js";


document.addEventListener('DOMContentLoaded', function () {
  const headerLowerPeliculas = document.getElementById('header-lower-peliculas');
  const headerLowerSeries = document.getElementById('header-lower-serie');
  const headerLowerAnimes = document.getElementById('header-lower-anime');
  const headerLowerKdramas = document.getElementById('header-lower-kdrama');
  const tituloButton = document.getElementById('tituloButton');


  headerLowerPeliculas.addEventListener('click', mostrarPeliculas)

  headerLowerSeries.addEventListener('click', mostrarSeries)

  headerLowerAnimes.addEventListener('click', mostrarAnimes)

  headerLowerKdramas.addEventListener('click', mostrarKdramas)

  tituloButton.addEventListener('click', buscarPorTituloSearchBar);
});

const catalogoAnime = catalogo.filter(item => item.tipo.toLowerCase().includes('anime'));
const catalogoSeries = catalogo.filter(item => item.tipo.toLowerCase().includes('serie'));
const catalogoPeliculas = catalogo.filter(item => item.tipo.toLowerCase().includes('pelicula'));
const catalogoKdrama = catalogo.filter(item => item.tipo.toLowerCase().includes('kdrama'));



function mostrarPeliculas() {
  console.log('peliculas')

  const titulo = document.getElementById('title').value.toLowerCase();
  const resultadoPeliculas = catalogoPeliculas
    .filter(pelis => pelis.titulo.toLowerCase().includes(titulo))
    .sort((a, b) => a.titulo.localeCompare(b.titulo));

  mostrarResultado(resultadoPeliculas);
}

function mostrarSeries() {
  console.log('series')

  const titulo = document.getElementById('title').value.toLowerCase();
  const resultadoSeries = catalogoSeries
    .filter(pelis =>
      pelis.titulo.toLowerCase().includes(titulo) &&
      pelis.tipo.toLowerCase() === 'serie'
    )
    .sort((a, b) => a.titulo.localeCompare(b.titulo));

  mostrarResultado(resultadoSeries);
}

function mostrarAnimes() {
  console.log('animes')

  const titulo = document.getElementById('title').value.toLowerCase();
  const resultadoAnime = catalogoAnime
    .filter(pelis => pelis.titulo.toLowerCase().includes(titulo))
    .sort((a, b) => a.titulo.localeCompare(b.titulo));

  mostrarResultado(resultadoAnime);
}

function mostrarKdramas() {
  console.log('kdramas')

  const titulo = document.getElementById('title').value.toLowerCase();
  const resultadoKdrama = catalogoKdrama
    .filter(pelis => pelis.titulo.toLowerCase().includes(titulo))
    .sort((a, b) => a.titulo.localeCompare(b.titulo));

  mostrarResultado(resultadoKdrama);
}


function buscarPorTituloSearchBar() {
  const elementosLiHeaderLower = document.querySelectorAll('.header-lower ul li');
  const titulo = document.getElementById('title').value.toLowerCase();
  const resultado = catalogo.filter(pelis => pelis.titulo.toLowerCase().includes(titulo));

  mostrarResultado(resultado);
  document.getElementById('title').value = '';

  elementosLiHeaderLower.forEach(li => {
    li.classList.remove('header-lower-active');
  });
}