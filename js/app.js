//Variables

const btnEnviar = document.querySelector('#enviar');
const resetearFormularioBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

const expresionRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//Variables para los 3 campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


eventListener();

function eventListener() {
    //cuando la app arranca 
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reinicia el formulario
    resetearFormularioBtn.addEventListener('click', resetearFormulario);

    //Enviar Email
    formulario.addEventListener('submit', enviarEmail);
}




//Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {

    if (e.target.value.length > 0) {

        //Elimina los errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    } else {
        // e.target.style.borderColor = 'red';
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');

    }

    if (e.target.type === 'email') {

        if (expresionRegular.test(e.target.value)) {
            //Elimina los errores
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

            console.log('valido');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');

            mostrarError('El email no es válido');
        }
    }


    if (expresionRegular.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'error', 'background-red-100', 'text-center', 'text-red-500', 'mt-5', 'mb-5', 'p-3');


    const errores = document.querySelectorAll('.error')

    if (errores.length === 0) {
        formulario.insertBefore(mensajeError, document.querySelector('.flex'));
    }

}

function enviarEmail(e) {
    e.preventDefault();

    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(() => {
        spinner.style.display = 'none';

        //mensaje de envio exitoso
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente';

        parrafo.classList.add('text-center', 'my-10', 'p-3', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        //
        formulario.insertBefore(parrafo, spinner);


        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 2000);
    }, 3000);

}

function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}