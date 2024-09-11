import {getUsuario, updateUsuario} from './firebase.js'

//Función para generar los numeros de la loteria
function generarNumerosLoteria(cantidad, maximo) {
    const numeros = new Set();
    while (numeros.size < cantidad) {
        const numero = Math.floor(Math.random() * (maximo + 1));
        numeros.add(numero);
    }
    return [...numeros];
}

//Función para generar el numero de serie
function generarSerieAleatoria(maximo) {
    return Math.floor(Math.random() * (maximo + 1));
}

// Configuración para una lotería típica Colombiana
const cantidadNumeros = 4;  
const maximoNumero = 9;    

const numerosLoteria = generarNumerosLoteria(cantidadNumeros, maximoNumero);
const numeroSerie = generarSerieAleatoria(999);

const loteriaContainer = document.getElementById('loteriaContainer');

// Añadir cada número generado al DOM
let resultado = '';
numerosLoteria.forEach(numero => {
    const numeroString = numero.toString()
    resultado += numeroString
    const numeroElement = document.createElement('div');
    numeroElement.classList.add('numero-loteria');
    numeroElement.textContent = numero;
    loteriaContainer.appendChild(numeroElement);
});

// Añadir la serie generada al DOM
const serieElement = document.createElement('div');
serieElement.classList.add('serie-loteria');
const numSerieString = String(numeroSerie).padStart(3, '0')
serieElement.textContent = 'SERIE ' + numSerieString;
loteriaContainer.appendChild(serieElement);

// Obtener id de usuario firestore desde localStorage
const emailUsuario = sessionStorage.getItem('correo')
const userId = sessionStorage.getItem(emailUsuario)

// Obtener documento de firestore correspondiente al usuario que esta jugando la loteria
const usuario = await getUsuario(userId);

// //Separar datos individuales del usuario para operar con ellos mas adelante
let compras = usuario._document.data.value.mapValue.fields.compras.arrayValue.values
const email = usuario._document.data.value.mapValue.fields.email.stringValue
const lastName = usuario._document.data.value.mapValue.fields.lastName.stringValue
const name = usuario._document.data.value.mapValue.fields.name.stringValue
const phone = usuario._document.data.value.mapValue.fields.phone.stringValue

// Recopilar en un array las compras guardadas en firestore
let comprasActualizado = []
if(compras){
     compras.forEach(data => {
         comprasActualizado.push({
             numero: data.mapValue.fields.numero.stringValue,
             serie: data.mapValue.fields.serie.stringValue
         })
     })   
 }

// Agregar la ultima compra al array
 comprasActualizado.push({
     numero: resultado,
     serie: numSerieString
 }) 

// Actualizar el usuario con la nueva compra en firestore
 await updateUsuario(userId, {
     compras: comprasActualizado,
     email,
     lastName,
     name,
     phone
 })
