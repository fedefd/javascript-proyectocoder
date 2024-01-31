let loggedIn = false;

const users = [
  { username: 'usuario', password: 'contraseña' },
];
localStorage.setItem('users', JSON.stringify(users));

function mostrarFormulario(tipo) {
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('mensaje-registro').innerText = '';
  document.getElementById('mensaje-login').innerText = '';
  document.getElementById('fondo-borroso').style.display = 'block';

  registrando = tipo === 'signup';
  logeando = tipo === 'login';
  const passwordInput = document.getElementById('password');
  passwordInput.style.display = 'block';
  passwordInput.placeholder = registrando ? 'Contraseña' : 'Contraseña';
  document.getElementById('mensajeRegistroLogin').innerHTML = registrando ? 'Registro' : 'Iniciar Sesión';
}

function ocultarFormulario() {
  document.getElementById('fondo-borroso').style.display = 'none';
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('mensaje-registro').innerText = '';
  document.getElementById('mensaje-login').innerText = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function registroSubmit() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (registrando) {
    signUp(username, password);
  } else if (logeando) {
    logIn(username, password);
  }
  if (localStorage.getItem('loggedIn') === 'true') {
    setTimeout(() => { ocultarFormulario(); }, 2000)  // 2 segundos para ocultar el formulario
  }
}


function limpiarMensajeRegistro() {
  document.getElementById('mensaje-registro').innerText = '';
}

function limpiarMensajeLogin() {
  document.getElementById('mensaje-login').innerText = '';
}


function signUp(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.username === username);

  limpiarMensajeRegistro();

  if (existingUser) {
    document.getElementById('mensaje-registro').innerText = 'El usuario ya existe. Por favor, elige otro nombre de usuario.';
  } else {
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('mensaje-registro').innerText = 'Registro exitoso. Ahora puedes iniciar sesión.';
    setTimeout(() => { window.location.href = 'index.html'; }, 1000);
  }
}

function logIn(username, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);
  limpiarMensajeLogin();

  if (user) {
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('username', username);
    document.getElementById('mensaje-login').innerText = 'Inicio de sesión exitoso. ¡Bienvenido, ' + username + '!';
    sesionIniciada();
  } else {
    document.getElementById('mensaje-login').innerText = 'Nombre de usuario o contraseña incorrectos. Intentalo de nuevo.';
  }
}

function sesionIniciada() {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  if (loggedIn) {
    const username = localStorage.getItem('username');
    console.log('bienvenido ' + username);
    actualizarInterfazSesionIniciada();
  } else {
    console.log('sesion no iniciada')
  }
}

document.addEventListener('DOMContentLoaded', sesionIniciada); // para llamar a la funcion al cargar la pagina para comprobar la sesion

function salirDeLaSesion() {
  localStorage.removeItem('loggedIn')
  limpiarMensajeLogin();
  console.log('Logged Off')
  actualizarInterfazSesionCerrada();
}

function actualizarInterfazSesionIniciada() {
  signupButton.style.display = 'none';
  loginButton.style.display = 'none';
  desconexionButton.style.display = 'inline-block';
}

function actualizarInterfazSesionCerrada() {
  desconexionButton.style.display = 'none';
  signupButton.style.display = 'inline-block';
  loginButton.style.display = 'inline-block';
}

function borrarLocalStorage() {
  localStorage.clear();
  console.log('localstorage cleareado')
}
