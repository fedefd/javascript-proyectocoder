const apiKey = '7b8f76ae237b7a0933842eb787e44804';

const headerLowerPopular = document.getElementById('header-lower-popular');
const headerLowerLoNuevo = document.getElementById('header-lower-lo-nuevo');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('searchResults');

headerLowerPopular.addEventListener('click', showPopularMovies);
headerLowerLoNuevo.addEventListener('click', showUpcomingMovies);


function handleSearch(event) {
  const searchTerm = event.target.value.trim();
  if (searchTerm.length > 0) {
    searchMovies(searchTerm);
  } else {
    clearResults();
  }
}

function searchMovies(searchTerm) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&api_key=${apiKey}`;
  axios.get(url)
    .then(response => {
      const results = response.data.results;
      if (results.length > 0) {
        displayResults(results);
      } else {
        displayMessage('No se encontraron resultados para la búsqueda.');
      }
    })
    .catch(error => {
      console.error('Error al buscar la película:', error);
      displayMessage('Ocurrió un error al buscar la película. Inténtelo de nuevo más tarde.');
    });
}

function displayResults(results) {
  const searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = '';

  const ul = document.createElement('ul');
  results.forEach(movie => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
      <span>${movie.title}</span>
    `;
    li.addEventListener('click', () => showMovieDetails(movie.id));
    ul.appendChild(li);
  });
  searchResultsDiv.appendChild(ul);
  document.getElementById('searchResults').classList.add('search-results-active');
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = '';
}

function showMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=es-ES`;
  axios.get(url)
    .then(response => {
      const movie = response.data;
      const detailsContainer = document.createElement('div');
      detailsContainer.classList.add('movie-details');
      detailsContainer.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster">
        <div>
        <p><strong>Resumen:</strong> ${movie.overview}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${movie.release_date}</p>
        <p><strong>Géneros:</strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Calificación:</strong> ${Math.round(movie.vote_average)}/10</p>
        <p><strong>Número de votos:</strong> ${movie.vote_count}</p>
        <p><strong>Duración:</strong> ${movie.runtime} minutos</p>
        <p><strong>Países de producción:</strong> ${movie.production_countries.map(country => country.name).join(', ')}</p>
        <p><strong>Compañías de producción:</strong> ${movie.production_companies.map(company => company.name).join(', ')}</p>
        ${movie.homepage ? `<p><strong>Enlace a la página oficial:</strong> <a href="${movie.homepage}" target="_blank">${movie.title} - Página oficial</a></p>` : ''}
        ${movie.streaming_sites && movie.streaming_sites.length > 0 ? `<p><strong>Enlaces de streaming:</strong> ${getStreamingLinks(movie)}</p>` : ''}
        </div>
        `;
      clearResults();
      document.getElementById('searchResults').appendChild(detailsContainer);
    })
    .catch(error => {
      console.error('Error al obtener los detalles de la película:', error);
      displayMessage('Ocurrió un error al obtener los detalles de la película. Inténtelo de nuevo más tarde.');
    });

  document.getElementById('search-input').value = '';
}

function getStreamingLinks(movie) {
  let streamingLinks = '';
  if (movie.streaming_sites && movie.streaming_sites.length > 0) {
    streamingLinks = movie.streaming_sites.map(site => `<a href="${site.url}" target="_blank">${site.name}</a>`).join(', ');
  } else {
    streamingLinks = 'No disponible';
  }
  return streamingLinks;
}


searchInput.addEventListener('input', function () {

  if (searchInput.value.trim() === '') {
    searchResults.classList.remove('search-results-active');
  }
});

function displayMessage(message) {
  document.getElementById('searchResults').innerHTML = `<p>${message}</p>`;
}

function clearResults() {
  document.getElementById('searchResults').innerHTML = '';
}

document.getElementById('search-input').addEventListener('input', handleSearch);


function showPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  axios.get(url)
    .then(response => {
      const results = response.data.results;
      if (results.length > 0) {
        displayResults(results);
      } else {
        displayMessage('No se encontraron películas populares.');
      }
    })
    .catch(error => {
      console.error('Error al obtener las películas populares:', error);
      displayMessage('Ocurrió un error al obtener las películas populares. Inténtelo de nuevo más tarde.');
    });
}

function showUpcomingMovies() {
  console.log('asdasd')
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
  axios.get(url)
    .then(response => {
      const results = response.data.results;
      if (results.length > 0) {
        displayResults(results);
      } else {
        displayMessage('No se encontraron próximas películas.');
      }
    })
    .catch(error => {
      console.error('Error al obtener las próximas películas:', error);
      displayMessage('Ocurrió un error al obtener las próximas películas. Inténtelo de nuevo más tarde.');
    });
}