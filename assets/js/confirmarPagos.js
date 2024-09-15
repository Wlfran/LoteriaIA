import { getCompras } from './firebase.js'
// const correo = sessionStorage.getItem('correo')
// const userId = sessionStorage.getItem(correo)

const userId = 'lLzQCmNotHNUehSKiJgMnfWo8zh2' // Cambia esto por el ID del usuario que quieras consultar

const mostrarCompras = async () => {
  try {
    // Obtener datos de compras
    const { usuarioData, compras } = await getCompras(userId)
    const ref = 'Ref001'
    // Obtener el contenedor de los números de lotería
    const loteriaContainer = document.getElementById('loteriaNumeros')
    loteriaContainer.innerHTML = '' // Limpiar el contenido actual
    debugger
    // Procesar cada compra
    compras.forEach(compra => {
      debugger
      // Dividir el número en dígitos individuales
      if (ref == compra.reference_sale) {
        var digitos = compra.numeroJugado.split('')
      }

      // Crear un círculo para cada dígito
      digitos.forEach(digito => {
        const numeroDiv = document.createElement('div')
        numeroDiv.classList.add('numero-loteria')
        numeroDiv.textContent = digito // Asigna el dígito al div
        loteriaContainer.appendChild(numeroDiv) // Añade el div al contenedor
      })
    })

    // Mostrar la serie si existe
    document.getElementById('loteriaSerie').textContent = `Serie: ${
      compras[0]?.numeroSerie || 'N/A'
    }`
  } catch (error) {
    console.error('Error al obtener los datos:', error)
  }
}

// Llama a la función para mostrar compras cuando el documento esté listo
document.addEventListener('DOMContentLoaded', mostrarCompras)
