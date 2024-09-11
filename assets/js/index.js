
const btnGenerar = document.getElementById('generarN')
const btnUsuario = document.getElementById('usuarioR')
const btnUsuarioContenido = document.getElementById('btnUsuarioContenido')
const btnGenerarContenido = document.getElementById('generarNuContenido')



const correo = sessionStorage.getItem('correo');
const userId = sessionStorage.getItem(correo);

if(userId){
    if(btnGenerarContenido){
        btnGenerar.style.display = 'block'
        // btnGenerarContenido.style.display = 'inline'
        btnUsuario.style.display = 'none'
        btnUsuarioContenido.style.display = 'none'
    }else{
        btnGenerar.style.display = 'block'
        // btnGenerarContenido.style.display = 'inline'
        // btnUsuario.style.display = 'none'
        // btnUsuarioContenido.style.display = 'none'
    }
    
}

function cerrarSesion() {
    Swal.fire({
        title: "",
        text: "¿Está seguro de cerrar sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Cerrar Sesión",
        cancelButtonText: "Cerrar",
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();  // Limpia sessionStorage
            return Swal.fire({
                text: "Sesión cerrada",
                icon: "success"
            });
        }
    }).then((result) => {
        // Solo recarga la página después de que el segundo Swal.fire se haya cerrado
        if (result && result.isConfirmed) {
            window.location.href = 'index.html';
        }
    });
    
}
    function abrirModal() {
        document.getElementById('modalPago').style.display = 'flex';
    }

    function cerrarModal() {
        document.getElementById('modalPago').style.display = 'none';
    }

    function md5Hex(string) {
        return CryptoJS.MD5(string).toString(CryptoJS.enc.Hex).toLowerCase();
    }

    function generarReferenceCode() {
        let ultimoNumero = localStorage.getItem('ultimoReferenceCode') || 0;
        ultimoNumero = parseInt(ultimoNumero, 10);
        let nuevoNumero = ultimoNumero + 1;
        if (nuevoNumero > 10000) {
            nuevoNumero = 0;
        }
        localStorage.setItem('ultimoReferenceCode', nuevoNumero);
        return nuevoNumero;
    }

    function procesarPago(numero, pais, loteria) {
        var monto;
        if(pais=='C'){
            if(numero==3){
                monto=55000
            }else{monto=75000}
        }
        if(pais=='H'){
            if(loteria=="diaria"){
                monto=45000
            }
            if(loteria=="premia"){
                monto=80000
            }
            if(loteria=="pega"){
                monto=120000
            }
        }
        if(pais=='R'){
            if(loteria=="pale"){
                monto=80000
            }
            if(loteria=="real"){
                monto=80000
            }
        }
        if(pais=='A'){

        }
        // const monto = document.getElementById('monto').value;
        const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');

        document.getElementById('payu-amount').value = monto;
        const nuevoReferenceCode = generarReferenceCode();
        const referenceCode = "Ref" + nuevoReferenceCode;
        document.getElementById('payu-referenceCode').value = referenceCode;

        const apiKey = '4Vj8eK4rloUd272L48hsrarnUA';
        const merchantId = '508029';
        const currency = 'COP';
        const firmaString = `${apiKey}~${merchantId}~${referenceCode}~${monto}~${currency}`;
        const firma = md5Hex(firmaString);
        document.getElementById('payu-signature').value = firma;

        console.log('Firma generada:', firma); 
        console.log('Reference Code:', referenceCode);
        console.log('Monto:', monto);


        document.getElementById('formulario-payu').submit();
    }

    // Cerrar modal cuando el usuario haga clic fuera de la ventana modal
    window.onclick = function(event) {
        const modal = document.getElementById('modalPago');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }