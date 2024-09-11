import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

// const firebaseConfig = {
//   apiKey: "AIzaSyA_UzDCpXkXKvzFAfc_ojetAiSeruaB3IA",
//   authDomain: "loteria-59d43.firebaseapp.com",
//   projectId: "loteria-59d43",
//   storageBucket: "loteria-59d43.appspot.com",
//   messagingSenderId: "793000466934",
//   appId: "1:793000466934:web:2df487d555ad089587cfd7"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDh1rTFzP_TaPZYG1N_vsln10XqGan-fvw",
  authDomain: "db-loteria.firebaseapp.com",
  projectId: "db-loteria",
  storageBucket: "db-loteria.appspot.com",
  messagingSenderId: "481276152488",
  appId: "1:481276152488:web:88543f55f23db803a7d09d",
  measurementId: "G-3TRGKZPS66"
};

// Inicializar instancia de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configurar reCAPTCHA
export const setupRecaptcha = (elementId) => {
  if (!auth) {
    throw new Error('Firebase auth no está inicializado');
  }

  return new RecaptchaVerifier(auth, elementId, {
    'size': 'invisible',
    'callback': (response) => {
    }
  }, auth);
};

// Enviar código de verificación al número de teléfono
export const signInWithPhone = (phoneNumber, appVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

//Crear un usuario en Firestore asignando el mismo id de la bd Authentication
export const saveUsuario = ( async (uid, name, lastName, phone, email, password, compras) => {
  try {
    await setDoc(doc(db, "users", uid), {
      uid,
      name,
      lastName,
      phone,
      email,
      // password,
      compras,
      createdAt: new Date()
    })
  }catch (error) {
    console.error('Error al guardar el usuario:', error);
    throw error;
  }
})
//obtener un usuario de firestore
export const getUsuario = (id) => getDoc(doc(db, 'users', id))

//obtener un usuarios de firestore
export const getUsuarios = () => getDocs(collection(db, 'users'))

//Actualizar un usuario de firestore
export const updateUsuario = (id, objeto) => updateDoc(doc(db, 'users', id), objeto)
