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
      loteriaDiv.classList.add('loteria-seccion', 'align-items-center', 'justify-content-between');
      loteriaDiv.style.marginBottom = '20px'; // Espacio entre loterías
      
      // Crear y añadir el nombre de la lotería
      const nombreDiv = document.createElement('h4');
      nombreDiv.textContent = `Lotería: ${description}`;
      loteriaDiv.appendChild(nombreDiv);

      // Crear un contenedor para los números y la serie
      const numerosSerieContainer = document.createElement('div');
      numerosSerieContainer.classList.add('numeros-serie-container', 'd-flex', 'align-items-center');

      // Procesar cada compra de esta lotería
      compras.forEach(compra => {
        if (compra.numeroJugado) {
          const digitos = compra.numeroJugado.split(''); // Dividir el número en dígitos individuales

          // Añadir cada dígito como un div circular
          digitos.forEach(digito => {
            const numeroDiv = document.createElement('div');
            numeroDiv.classList.add('numero-loteria');
            numeroDiv.textContent = digito; // Asigna el dígito al div
            numerosSerieContainer.appendChild(numeroDiv);
          });
          debugger
          // Añadir la serie si existe
          if (compra.numeroSerie) {
            const serieDiv = document.createElement('div');
            serieDiv.classList.add('serie-loteria');
            serieDiv.textContent = `SERIE ${compra.numeroSerie}`;
            numerosSerieContainer.appendChild(serieDiv);
          }
        } else {
          console.warn('Número de compra no definido:', compra);
        }
      });

      // Añadir el contenedor de números y serie al contenedor de la lotería
      loteriaDiv.appendChild(numerosSerieContainer);

      // Añadir el contenedor de la lotería al contenedor principal
      loteriaContainer.appendChild(loteriaDiv);
    }
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

// Llama a la función para mostrar compras cuando el documento esté listo
document.addEventListener('DOMContentLoaded', mostrarCompras);
