import { cerrarSesionFirebase } from './firebase.js';  // Ajusta la ruta si es necesario

// Define la función
export function cerrarSesion() {
    Swal.fire({
        title: "",
        text: "¿Está seguro de cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Cerrar Sesión",
        cancelButtonText: "Cerrar",
    }).then((result) => {
        if (result.isConfirmed) {
            return cerrarSesionFirebase();  // Llama a la función que cierra sesión en Firebase
        }
    }).then(() => {
        return Swal.fire({
            text: "Sesión cerrada",
            icon: "success"
        });
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();  // Limpia sessionStorage
            window.location.href = 'index.html';  // O redirige a la página que necesites
        }
    }).catch((error) => {
        console.error('Error al cerrar sesión:', error);
        Swal.fire({
            text: "Hubo un error al cerrar sesión",
            icon: "error"
        });
    });
}

// Exponer la función globalmente para acceso desde HTML
window.cerrarSesion = cerrarSesion;
