import { setupRecaptcha, signInWithPhone, saveUsuario, getUsuario } from './firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const auth = getAuth();
const userForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const forgotPassword = document.getElementById('forgotPassword');

document.getElementById('closeModalUsuario').addEventListener('click', closeModal);
document.getElementById('overlay').addEventListener('click', closeModal);

// Evento de inicio de sesión
// Evento de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  try {
    // Iniciar sesion con email y contrasenia
    const login = await signInWithEmailAndPassword(auth, email, password);

    // Guardar el accessToken
    const accessToken = login.user.accessToken;
    
    // Guardar Id de usuario
    const userId = login.user.uid

    // Obtener toda la informacion del usuario guardada en Firestore
    const user = await getUsuario(userId);

    // Guardar correo y userId en sessionStorage
    sessionStorage.setItem('correo', email)
    sessionStorage.setItem(email, userId)
    success()
    // Redireccionar a la pestaña del sorteo
    
    /*
    // Obtener usuarios de Firestore
    const querySnapshot = await getUsuarios();
    
    // Recorrer la lista de usuarios para obtener el ID de usuario de Firestore
    querySnapshot.forEach(doc => {
      const docFirebase = doc.data();
      if (docFirebase.email === email) {
        const userIdFirestore = doc.id; // Obtén el ID del documento en Firestore
        sessionStorage.setItem('correo', email)
        sessionStorage.setItem(email, userIdFirestore)
        console.log(`Usuario autenticado con ID de Firestore: ${userIdFirestore}`);
        //location.href = '../../about.html';
      }
    }); */
  } catch (e) {
    console.error(e);
    alert('Datos incorrectos');
  }
});

// Evento de registro de usuario
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombres = userForm['nombres'].value;
  const apellidos = userForm['apellidos'].value;
  const celular = userForm['celular'].value;
  const correo = userForm['correo'].value;
  const contraseña = userForm['contraseña'].value;
  const compras = [];
  
  try {
    viewModal();
    const appVerifier = setupRecaptcha('recaptcha-container');
    
    const confirmationResult = await signInWithPhone(celular, appVerifier);

    const verificationCode = await showModalAndAwaitConfirmation();

    const result = await confirmationResult.confirm(verificationCode);
    
    const userIdPhone = result.user;

    //Crear usuario en la bd Authentication con email y contrasenia
    const createUser = await createUserWithEmailAndPassword(auth, correo, contraseña)
    //.then(res => alert('Usuario Creado Existosamente'))
    //.catch(er => alert('El usuario ya existe'))

    //Guardar id de usuario de la bd Authentication
    const userId = createUser.user.uid
    successR()
    //Crear usuario en Firestore con mismo id de la bd Authentication
    await saveUsuario(userId, nombres, apellidos, celular, correo, contraseña, compras);
    

    userForm.reset();
    
    window.location.href = 'index.html'
  
  }catch(error) {
    //if para verificar si el error corresponde a que un usuario ya existe la bd Authentication
    if (error.toString().substring(32, 57) === 'auth/email-already-in-use'){
      alert('El usuario ya existe')
    }else{
      // Los demas errores que pueden generarse durante la creacion del usuario
      console.error('Error durante la autenticación o registro:', error);
      alert('Hubo un error al registrar el usuario. Inténtalo de nuevo.');
    }
  }
});

function success (){
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Sesión iniciada",
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    // Redirige a 'index.html' solo después de que la alerta se haya cerrado
    location.href = 'index.html';
});
}
function successR (){
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Registro Exitoso",
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    // Redirige a 'index.html' solo después de que la alerta se haya cerrado
    location.href = 'index.html';
});
}


function viewModal() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('modal').style.display = 'none';
}

const showModalAndAwaitConfirmation = () => {
  return new Promise((resolve) => {
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('closeModal');
    const form = document.getElementById('verification-form');

    modal.style.display = 'flex';

    closeModalButton.addEventListener('click', () => {
      const code = Array.from(form.querySelectorAll('input')).map(input => input.value).join('');
      modal.style.display = 'none';
      resolve(code);
    });
  });
};

// Evento botones ingreso y registro
document.getElementById('login-tab').addEventListener('click', function() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
  this.classList.add('active');
  document.getElementById('register-tab').classList.remove('active');
});

document.getElementById('register-tab').addEventListener('click', function() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
  this.classList.add('active');
  document.getElementById('login-tab').classList.remove('active');
});

    // Mostrar el modal cuando se haga clic en "Recuperar contraseña"
    document.getElementById('btn-recuperar').addEventListener('click', function() {
        document.getElementById('overlayRecuperar').style.display = 'block';
        document.getElementById('modalRecuperar').style.display = 'block';
    });

    // Cerrar el modal al hacer clic en "Cancelar"
    document.getElementById('cancelarRecuperar').addEventListener('click', function() {
        document.getElementById('overlayRecuperar').style.display = 'none';
        document.getElementById('modalRecuperar').style.display = 'none';
    });

    // Validar y enviar el correo cuando se haga clic en "Enviar"
    document.getElementById('enviarRecuperar').addEventListener('click', function() {
      const email = document.getElementById('email-recuperar').value;
  
      // Validar que el correo no esté vacío
      if (email === '') {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, ingresa tu correo electrónico.',
          });
      } else {
          // Llamada a la función para enviar el correo de recuperación de contraseña
          sendPasswordResetEmail(auth, email)
          .then(() => {
              Swal.fire({
                  icon: 'success',
                  title: 'Correo enviado',
                  text: 'Se ha enviado un enlace de recuperación a tu correo electrónico.',
              });
  
              // Cerrar el modal después de enviar
              document.getElementById('overlayRecuperar').style.display = 'none';
              document.getElementById('modalRecuperar').style.display = 'none';
          })
          .catch((error) => {
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Ocurrió un error al enviar el correo. Inténtalo de nuevo.',
              });
          });
      }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const input = document.getElementById('celular');

    dropdownButton.addEventListener('click', function() {
        // Toggle the dropdown menu visibility
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const prefix = this.getAttribute('data-prefix');
            input.value = prefix + ' '; // Add the prefix and a space
            dropdownMenu.classList.remove('show');
        });
    });
});
document.getElementById('btn-inicio').addEventListener('click', function() {
  window.location.href = 'index.html';
});
document.addEventListener('DOMContentLoaded', function() {
  const checkbox = document.getElementById('aceptarPoliticas');
  const submitButton = document.getElementById('openModal');
  const politicasError = document.getElementById('politicasError');

  // Inicialmente deshabilitar el botón
  submitButton.disabled = true;

  // Función para verificar el estado del checkbox
  const toggleSubmitButton = () => {
    if (checkbox.checked) {
      submitButton.disabled = false;
      politicasError.style.display = 'none';
    } else {
      submitButton.disabled = true;
      politicasError.style.display = 'block';
    }
  };

  // Añadir evento de cambio al checkbox
  checkbox.addEventListener('change', toggleSubmitButton);
});

  
