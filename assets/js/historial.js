import { getComprasPorCurrency } from './firebase.js';

const userId = 'lLzQCmNotHNUehSKiJgMnfWo8zh2'; // Cambia esto por el ID del usuario que quieras consultar
const currency = 'COP'; // Cambia esto por la currency que quieras filtrar

const mostrarCompras = async () => {
  try {
    // Obtener los datos de las compras filtrados por currency
    const { usuarioData, compras } = await getComprasPorCurrency(userId, currency);

    // Obtener el contenedor de loterías
    const loteriaContainer = document.getElementById('loteriaContainer');
    if (!loteriaContainer) {
      console.error('No se encontró el contenedor de lotería');
      return; // Salir de la función si el contenedor no se encuentra
    }
    loteriaContainer.innerHTML = ''; // Limpiar el contenido actual

    // Agrupar compras por nombre de lotería
    const loterias = {};
    compras.forEach(compra => {
      if (compra.description) {
        if (!loterias[compra.description]) {
          loterias[compra.description] = [];
        }
        loterias[compra.description].push(compra);
      } else {
        console.warn('Nombre de lotería no definido para la compra:', compra);
      }
    });

    // Generar dinámicamente los divs para cada lotería
    for (const [description, compras] of Object.entries(loterias)) {
      // Crear un contenedor para esta lotería
      const loteriaDiv = document.createElement('div');
      loteriaDiv.classList.add('loteria-seccion');
      
      // Crear y añadir el nombre de la lotería
      const nombreDiv = document.createElement('h3');
      nombreDiv.textContent = `Lotería: ${description}`;
      loteriaDiv.appendChild(nombreDiv);

      // Crear un contenedor para los números de esta lotería
      const numerosContainer = document.createElement('div');
      numerosContainer.classList.add('numeros-container');

      // Procesar cada compra de esta lotería
      compras.forEach(compra => {
        if (compra.numero) {
          const digitos = compra.numero.split(''); // Dividir el número en dígitos individuales

          digitos.forEach(digito => {
            const numeroDiv = document.createElement('div');
            numeroDiv.classList.add('numero-loteria');
            numeroDiv.textContent = digito; // Asigna el dígito al div
            numerosContainer.appendChild(numeroDiv);
          });
        } else {
          console.warn('Número de compra no definido:', compra);
        }
      });

      // Añadir el contenedor de números al contenedor de la lotería
      loteriaDiv.appendChild(numerosContainer);

      // Añadir el contenedor de la lotería al contenedor principal
      loteriaContainer.appendChild(loteriaDiv);
    }

    // Mostrar la serie si existe
    const loteriaSerieElement = document.getElementById('loteriaSerie');
    if (loteriaSerieElement) {
      loteriaSerieElement.textContent = `Serie: ${compras[0]?.serie || 'N/A'}`;
    } else {
      console.warn('No se encontró el elemento de la serie de lotería. No se puede actualizar el texto.');
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

// Llama a la función para mostrar compras cuando el documento esté listo
document.addEventListener('DOMContentLoaded', mostrarCompras);
