function desplegarTarjeta(){
    const datosTarjeta = document.getElementById('datosDeTarjeta');
    const mercadoPago = document.getElementById('datosMercadoPago');
    const boton = document.getElementById('botonConfirmar');
    const formulario = document.getElementById('formularioDePago');
    const inputs = document.querySelectorAll('input.required');

    inputs.forEach(input => {
        input.setAttribute('required', ''); 
    });

    datosTarjeta.style.display = 'block';
    mercadoPago.style.display = 'none';
    boton.value = 'Pagar'
    formulario.action = './pago_realizado.html';

}

function desplegarMercadoPago(){
    const datosTarjeta = document.getElementById('datosDeTarjeta');
    const mercadoPago = document.getElementById('datosMercadoPago');
    const boton = document.getElementById('botonConfirmar');
    const formulario = document.getElementById('formularioDePago');
    const inputs = document.querySelectorAll('input.required');
    const contenidoDeLosInputs = document.querySelectorAll('.input-tarjeta');

    inputs.forEach(input => {
        input.removeAttribute('required') 
    });

    contenidoDeLosInputs.forEach(input =>{
        input.value = null;
    });

    formulario.action = 'https://www.mercadopago.com.ar/home';
    boton.value = 'Continuar'
    datosTarjeta.style.display = 'none';
    mercadoPago.style.display = 'block';
}

function soloPermitirLetrasEnElNombre(){
    const inputNombre = document.getElementById('nombreTarjeta__input--Id');

    inputNombre.addEventListener('input', (event) =>{
        let valorDelInput = event.target.value;
        valorDelInput = valorDelInput.replace(/[^A-Za-z\s]/g, '');

        event.target.value = valorDelInput;
    });
}

function soloPermitirNumerosEnLaTarjeta(){
    const inputNumero = document.getElementById('numeroTarjeta__input--Id');

    inputNumero.addEventListener('input', () =>{
        let numerosDeLaTarjeta = inputNumero.value.replace(/[^0-9]/g, '');
        let nuevoValor = numerosDeLaTarjeta.replace(/(.{4})/g, '$1 ');
        inputNumero.value = nuevoValor.trim();
    });
}

function soloPermitirNumerosEnlaFechaDeVencimiento(){
    const inputVencimiento = document.getElementById('vencimientoTarjeta__input--Id');

    inputVencimiento.addEventListener('input', () =>{
    let fechaDeVencimiento = inputVencimiento.value.replace(/[^0-9]/g, '');
    if(fechaDeVencimiento >= 3){
    let nuevoValor = fechaDeVencimiento.replace(/(.{2})/, '$1/');
    inputVencimiento.value = nuevoValor;
    } else {
        inputVencimiento.value = fechaDeVencimiento;
    }
    });

    inputVencimiento.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            let valorActual = inputVencimiento.value;
            if (valorActual.length === 3 && valorActual.charAt(2) === '/') {
                inputVencimiento.value = valorActual.slice(0, 2); 
                event.preventDefault(); 
            }
        }
    });
}

function soloPermitir16Digitos(){
    const inputNumero = document.getElementById('numeroTarjeta__input--Id');
    const formulario = document.getElementById('formularioDePago');
    const mensajeError = document.getElementById('mensajeDeError');
    
formulario.addEventListener('submit', (event)=>{
    if(inputNumero.value.length !== 19 && inputNumero.value.length > 0 ){
        mensajeError.classList.add('visible');

        setTimeout(() =>{
            mensajeError.classList.remove('visible');
        }, 7000);
        event.preventDefault();
        }
    });
}

function descuentoPorGiftcard(){}
    const giftcard = localStorage.getItem('giftcard');

    console.log(giftcard);

soloPermitirNumerosEnlaFechaDeVencimiento();
soloPermitirNumerosEnLaTarjeta();
soloPermitirLetrasEnElNombre();