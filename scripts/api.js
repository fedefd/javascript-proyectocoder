const apiKey = '7b8f76ae237b7a0933842eb787e44804';

axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
  .then(response => {
    console.log(response.data.results);
  })
  .catch(error => {
    console.error('Error al hacer la solicitud a la API de TMDb:', error);
  });


axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log('Datos recibidos:', response.data);
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });