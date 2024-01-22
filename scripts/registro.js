function mostrarFormulario(tipo) {
  document.getElementById('formulario').style.display = 'block';
  document.getElementById('mensaje-registro').innerText = '';
  document.getElementById('mensaje-login').innerText = '';
  document.getElementById('fondo-borroso').style.display = 'block';

  registrando = tipo === 'signup';
  const passwordInput = document.getElementById('password');
  passwordInput.style.display = 'block';
  passwordInput.placeholder = registrando ? 'Contraseña' : 'Contraseña';
  document.getElementById('mensajeRegistroLogin').innerHTML = registrando ? 'Registro' : 'Iniciar Sesión';
}


function registroSubmit() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (registrando) {
    signUp(username, password);
  } else {
    logIn(username, password);
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
    document.getElementById('mensaje-login').innerText = 'Inicio de sesión exitoso. ¡Bienvenido, ' + username + '!';
  } else {
    document.getElementById('mensaje-login').innerText = 'Nombre de usuario o contraseña incorrectos. Intentalo de nuevo.';
  }
}

function ocultarFormulario() {
  document.getElementById('fondo-borroso').style.display = 'none';
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('mensaje-registro').innerText = '';
  document.getElementById('mensaje-login').innerText = '';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
}

function borrarLocalStorage() {
  localStorage.clear();
}